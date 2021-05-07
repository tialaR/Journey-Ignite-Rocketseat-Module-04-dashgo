import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SideBarDrawerProviderProps {
    children: ReactNode;
}

type SideBarDrawerContextData = UseDisclosureReturn;

const SideBarDrawerContext = createContext({} as SideBarDrawerContextData);

export function SideBarDrawerProvider({ children }: SideBarDrawerProviderProps) {
    const disclosure = useDisclosure();
    const router = useRouter();

    //Vai disparar uma função sempre que a rota da aplicação mudar
    // router.asPath = caminho da rota
    useEffect(() => {
        // Toda vez que o router.asPath mudar eu vou fechar a side bar
        disclosure.onClose();
    }, [router.asPath]);

    return(
        <SideBarDrawerContext.Provider value={disclosure}>
            {children}
        </SideBarDrawerContext.Provider>
    );
}

export const useSideBarDrawer = () => useContext(SideBarDrawerContext);