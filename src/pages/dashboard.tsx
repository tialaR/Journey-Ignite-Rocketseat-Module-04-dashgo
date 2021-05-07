import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { SideBar } from '../components/SideBar';
/* o módulo react-apexcharts só é funcional pelo lado do cliente (browser). Ele não 
funciona na camada do back-end. Então é necessário implementar uma forma que o chart
funcione somente dentro do bworser e não seja carregado no next quando estiver
fazendo o processo de server side rendering (o next por padrão faz esse processo toda
vez que a página é carregada pela primeira vez). Para isso devo usar o 'dynamic' importado
do next/dynamic e realizar a importação do chart de uma forma diferente (usando o processo de 
laysing loading que carrega um componente conforme alguma ação do usuário como por exemplo
através do click em um botão):
por exemplo: 
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

ssr: false => Fará com que o gráfico seja carregado somente pelo lado do browser (nunca será
    carregado pelo lado do servidor, ou seja, o server side rendering estará desligado)
*/

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

//Variável de configurações do gráfico
const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
            '2021-03-24T00:00:00.000Z'
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
};

//Variável contendo os dados do gráfico
/* Posso ter vários tipos de dados diferentes dentro do gráfico
(como quero 1 único tipo de dado coloco apenas uma informação dentro do vetor) */
const series = [
    { name: 'series1', data: [ 31, 120, 10, 28, 51, 18, 109 ] } 
];

export default function Dashboard() {
    return(
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                    <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
                        <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>
                    <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
                        <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={160}
                        />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    );
}