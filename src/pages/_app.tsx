import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'; 
import { theme } from '../styles/theme';
import { SideBarDrawerProvider } from '../context/SideBarDrawerContext';
import { makeServer } from '../service/mirage';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../service/queryClient';

//Verificando se o ambiente q/ está rodando é o de desenvolvimento:
//NODE_ENV -> Variável disponibilizada pelo next de forma automática
if(process.env.NODE_ENV === 'development') {
  //Rodar o ambiente de desenvolvimento do miragejs
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;

/*
  ChakraProvider -> Contexto do chakra q/ provê todas as informações
  do chakra para o app (nesse caso o tema).

  Existem vários elementos no html q/ vem com uma estilização própria.
  A propriedade 'resetCSS' do componente ChakraProvider remove essas 
  estilizações próprias do html de nossa aplicação. Essa prop já vem
  habilitada por padrão.
*/
