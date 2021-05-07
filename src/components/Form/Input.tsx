import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
   name, label, error = null, ...rest }, 
   ref) => {
    return(
        <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

        <ChakraInput 
          {...rest}
          ref={ref}
          id={name}
          name={name} 
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
}

export const Input = forwardRef(InputBase);

/*
  -> O método forwardRef vai realizar um encaminhamento da ref do input. Ou seja,
  ele vai pegar a ref que pode estar sendo passada para o componente e vai encaminhar 
  p/ o componente InputBase.
*/