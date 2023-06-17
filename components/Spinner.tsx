import {Box, Flex, Spinner} from "@chakra-ui/react"
export const Loader = () => {
    return (
        <Box width="100vw" height="100vh">
            <Flex justifyContent="center" alignItems="center">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Flex>
        </Box>
    )
}