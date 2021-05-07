import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSideBarDrawer } from '../../context/SideBarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SerachBox';

export function Header() {
    //Recuperando do hook useSideBarDrawer o método q/ preciso chamar para abrir a side bar
    const { onOpen } = useSideBarDrawer();

    //Habilita comportamento (responsivo) qdo o window estiver no tamanho lg
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true, //A partir do large p/ frente não estou mais na wideversion
    });

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            { !isWideVersion && (
                <IconButton
                    aria-label="Abrir navegação"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                ></IconButton>
            ) }

            <Logo />

            {isWideVersion && <SearchBox />}

            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}