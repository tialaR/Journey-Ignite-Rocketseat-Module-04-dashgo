//Definindo/Configurando tema da aplicação com o chakra-ui

import { extendTheme } from '@chakra-ui/react';

//Subistituindo algumas props que vem por padrão no tema do chakra (estilos globais da aplicação)
//Adequando o estilo ao que é exigido por nossa aplicação
export const theme = extendTheme({
    colors: {
        gray: { //Substituindo todos os tons de cinza
            "900": "#181B23",
            "800": "#1F2029",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        }
    },
    fonts: { //Substituindo do header e do body
        heading: 'Roboto',
        body: 'Roboto',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.50'
            }
        }
    }
})