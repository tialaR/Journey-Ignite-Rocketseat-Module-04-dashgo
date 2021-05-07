import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({ 
    children, 
    shouldMatchExactHref = false,
    ...rest 
}: ActiveLinkProps) {
    const { asPath } = useRouter(); //Recuperando a rota ativa

    let isActive = false;

    //Estabelecendo o link que estará ativo de acordo com a rota atual 
    if(shouldMatchExactHref && asPath === rest.href || asPath === rest.as) {
        isActive = true;
    }

    //Estabelecendo o link que estará ativo de acordo com a rota atual 
    //Matendo o link ativo mesmo quando entramos nas páginas internas  de alguma caegoria da sidebar
    // ex: /users e /users/create -> O link usuários se manterá ativo qdo acessarmos as duas rotas
    if(!shouldMatchExactHref &&
        (asPath.startsWith(String(rest.href)) || //Considera todas as rotas q/ começam com o href passado p/ o componente (/rota/demaisRotas)
         asPath.startsWith(String(rest.as)))) { //Considera todas as rotas q/ começam com o href passado p/ o componente (/rota/demaisRotas)
             isActive = true;
         }

    return(
        <Link { ...rest }>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Link>
    );
}