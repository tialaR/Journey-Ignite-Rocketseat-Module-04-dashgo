import { Flex, Button, Stack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignInFormData = {
  email: string;
  password: string;
}

//Criando esquema de validação com yup integrado ao react-hook-form:
const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema) //Passando o esquema de validação de dados p/ o form
  });
  const erros = formState.errors;
  /*
    -> Conceito de uncontroled component: Através do register o react-hook-form 
    cria as referências para os componentes de forma automática
    -> Isso permitirá o acesso ao componente de input de uma maneira imperativa
    (ações de maneira imperativa poderão ser executadas)
  */

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    //console.log(values);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex 
        as="form" 
        onSubmit={handleSubmit(handleSignIn)} //Para q/ a função handleSignIn tenha acesso as refs dos inputs devo utilizar o método handleSubmit para chamar a função handleSignIn
        width="100%" 
        maxWidth={360} 
        bg="gray.800" 
        p="8" 
        borderRadius={8} 
        flexDir="column"  
      >
        <Stack spacing="4">
          <Input 
            name="email"
            type="email"
            label="E-mail"
            error={erros.email}
            {...register('email')} //Utilizando conceito de uncontroled component (referenciando o input -> funciona como uma ref)
          />
          <Input 
            name="password"
            type="password"
            label="Senha"
            error={erros.password}
            {...register('password')} //Utilizando conceito de uncontroled component (referenciando o input -> funciona como uma ref)
          />
        </Stack>

        <Button 
          isLoading={formState.isSubmitting}
          type="submit" 
          mt="6" 
          size="lg"
          colorScheme="pink"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
