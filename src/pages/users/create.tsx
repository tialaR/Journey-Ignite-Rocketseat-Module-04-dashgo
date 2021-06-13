import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack} from "@chakra-ui/react";
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { useMutation } from 'react-query';
import { api } from "../../service/api";
import { queryClient } from "../../service/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  //Criando esquema de validação com yup integrado ao react-hook-form:
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
  });

export default function CreateUser() {
    const router = useRouter();

    //Cadastrando usuário na api e salvando no cache
    /* A diferença de utilizar o react-query para essa chamada a api é que com ele
    conseguimos monitorar o estado da requisição (ex: se está em loading, se está pausada, etc...) */
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        });
        console.log(response.data.users)

        return response.data.user;
    }, {
        //Limpando o cache da listagem de usuários quando a criação de um usuário der sucesso
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });
    const erros = formState.errors;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
       // console.log(values);
       await createUser.mutateAsync(values);

       //Enviando usuário de volta p/ tela de users
       router.push('/users');
    }

    return(
        <Box>
            <Header />

             <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box 
                    as="form" 
                    onSubmit={handleSubmit(handleCreateUser)}
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.800" 
                    p={["6", "8"]}
                >
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                {...register('name')} 
                                error={erros.name}
                                name="name" 
                                label="Nome completo" 
                            />
                            <Input 
                                {...register('email')} 
                                error={erros.email}
                                name="email" 
                                type="email" 
                                label="E-mail" 
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                {...register('password')} 
                                error={erros.password}
                                name="password" 
                                type="password" 
                                label="Senha" 
                            />
                            <Input 
                                {...register('password_confirmation')} 
                                error={erros.password_confirmation}
                                name="password_confirmation" 
                                type="password" 
                                label="Confirmação da senha" 
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button 
                                    as="a" 
                                    colorScheme="whiteAlpha"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button 
                                isLoading={formState.isSubmitting}
                                type="submit" 
                                colorScheme="pink"
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}