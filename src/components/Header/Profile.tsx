import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Tiala Rocha</Text>
                    <Text color="gray.300" fontSize="small">
                        tialarocha@gmail.com
                </Text>
                </Box>
            )}

            <Avatar size="md" name="Tiala Rocha" src="https://avatars.githubusercontent.com/u/44264528?s=400&u=496b49c02a479ad6271015f374037388cede5e44&v=4" />
        </Flex>
    );
}