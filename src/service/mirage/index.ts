import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker'; //Lib geradora de dados fake

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        //Determina como o miraje deve interpretar os dados q/ são enviados por ele
        // ActiveModelSerializer -> Vai estabelecer uma forma de enviar e receber os dados tudo em uma única requisição
        serializers: {
            application: ActiveModelSerializer, //Permite a utilização de relacionamento dos dados 
        },

        //tipo de dados q/serão armazenados dentro do BD fictício:
        models: {
            user: Model.extend<Partial<User>>({}),
        },

        //Grando dados em massa:
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`;
                },
                email() {
                    return faker.internet.email().toLocaleLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            })
        },

        //Criando dados no mirage assim q/ o servidor for inicializado
        seeds(server) {
            server.createList('user', 200); //Criando 200 usuários utilizando o factories que foi configurado
        },

        //Rotas 
        routes() {
            //Caminho que a aplicação vai precisar acessar p/ conseguir chamar as rotas. ex: todas as rotas vão precisar chamar api/rota
            this.namespace = 'api';
            this.timing = 750; // Delay-> Definindo o tempo que as requisições irão acontecer 

            //Rotas do mirage
            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams;

                const total = schema.all('user').length;

                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users =this.serialize(schema.all('user')).users.slice(pageStart, pageEnd);

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                );
            });

            this.get('users/:id');
            this.post('/users');

            this.namespace = ''; //Limpando o namespace p/ não prejudicar as rotas que usam a nomenclatura 'api' no next
            this.passthrough() // Faz com que todas as chamadas que passem pelo endereço 'api' passem pelo miraje e se não forem detectadas pelas rotas do miraje elas vão passar adiante para a rota original delas
        }
    });

    return server;
}
