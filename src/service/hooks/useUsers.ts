import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];
}

//Requisição da lista de usuários
export async function getUsers(page: number): Promise<GetUsersResponse> {
    //Busca a lista de usuários de acordo com a página selecionada na paginação
    const { data, headers } = await api.get('users', {
        params: {
            page,
        }
    });

    //Número total de registros q/ tenho dentro da api (lista.lenght)
    const totalCount = Number(headers['x-total-count']);

    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),

        }
    })

    return {
        users, 
        totalCount,
    };
}

//Hook que vai retornar a lista de usuários do cache:
export function useUsers(page: number) {
    //Realizando requisção a api e guardando os dados no cahce local
    return useQuery(['users', page], () => getUsers(page), {

        // A query não será recarregada dentro do período de tempo especificado
        staleTime: 1000 * 60 * 10, // 10 minutos
    })
}
//['users', page] => Chave da query de paginação (só realiza a requisição ao servidor se os dados solicitados não estiverem sido salvos no cache através da chave especificada, ou caso esses dados precisem ser revalidados)