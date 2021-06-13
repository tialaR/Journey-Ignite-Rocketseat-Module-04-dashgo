import { Button } from "@chakra-ui/button";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { number } from "yup/lib/locale";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPagechange: (page: number) => void;
}

//Quantas páginas mostro a direita e a esquerda de cada página atual;
const siblingsCount = 1;

//Função de geradora de array das páginas irmãs da página atual
function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0) //filter -> páginas < 1 não aparecem na páginação
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPagechange,
}: PaginationProps) {
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

    //Quantas páginas devem ser exibidas antes da página atual (antes)
    const previrousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : [];

    //Quantas páginas devem ser exibidas depois da página atual (a seguir)
    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : [];

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">

                {/* mostra as páginas q/ não estão cobertas pela siblingsCount */}
                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPagechange} pageNumber={1} />
                        {currentPage > (2 + siblingsCount) && (
                             <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )} 
                    </>
                )}

                {/* Páginas que vem antes */}
                {previrousPages.length > 0 && previrousPages.map(page => {
                    return <PaginationItem onPageChange={onPagechange} pageNumber={page} />
                })}

                {/* Página atual */}
                <PaginationItem onPageChange={onPagechange} isCurrent pageNumber={currentPage} />

                {/* Páginas que vem depois */}
                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem onPageChange={onPagechange} pageNumber={page} />
                })}

                {/* mostra as páginas q/ não estão cobertas pela siblingsCount */}
                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        {(currentPage + 1 + siblingsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                        <PaginationItem onPageChange={onPagechange} pageNumber={lastPage} />
                    </>
                )}
            </Stack>
        </Stack>
    );
}