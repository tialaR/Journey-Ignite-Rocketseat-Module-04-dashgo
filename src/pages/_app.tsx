import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'; 
import { theme } from '../styles/theme';
import { SideBarDrawerProvider } from '../context/SideBarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>
      </ChakraProvider>
    </>
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
