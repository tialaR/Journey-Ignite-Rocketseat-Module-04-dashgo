import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Checkbox, Flex, Heading, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { api } from "../../service/api";
import { getUsers, useUsers } from "../../service/hooks/useUsers";
import { queryClient } from "../../service/queryClient";

export default function UserList() {
    const [page, setPage] = useState(1);
    //Realizando requisição http e armazenando dados em um cache local utilizanod o React query
    const { data, isLoading, isFetching, error } = useUsers(page);

    //Habilita comportamento (responsivo) qdo o window estiver no tamanho lg
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true, //A partir do large p/ frente não estou mais na wideversion
    });

    //Função que realiza o prefetch dos dados quando o usuário passa o mouse por cima do nome
    async function handlePrefetchUser(userId: string) {
        //Realizando um cache de dados para cada usuário q/ for carregado na aplicação (quando passar o mouse por cima)
        // ['user', userId] => Chave do cache de cada usuário
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`);

            return response.data;
        }, {
            //Tempo que os dados ficaram frescos (em quanto tempo não precisaram ser carregados de novo)
            staleTime: 1000 * 60 * 10 //10 minutos
        });
        /* Necessário informar qual chave que será realizado o prefetch e qual função irá realizar o prefetch dos dados */
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários

                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="md"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Criar novo
                            </Button>
                        </NextLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados do usuário.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>
                                            Usuário
                                        </Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link 
                                                            color="purple.400"
                                                            onMouseEnter={() => handlePrefetchUser(user.id)}
                                                        >
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && <Td>{user.createdAt}</Td>}
                                                <Td>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <Box>
                                                            {isWideVersion ? (
                                                                <Button
                                                                    as="a"
                                                                    size="sm"
                                                                    fontSize="sm"
                                                                    colorScheme="purple"
                                                                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                                >
                                                                    Editar
                                                                </Button>
                                                            ) : (
                                                                <Button as="a" size="sm" colorScheme="purple">
                                                                    <Icon as={RiPencilLine} fontSize="16" />
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPagechange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}
