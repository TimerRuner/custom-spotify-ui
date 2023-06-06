import React, {FC} from "react";
import {Menu} from "@chakra-ui/menu";
import {Box, Button} from "@chakra-ui/react";
import {useActions} from "../hooks/actionCreator";

export const Layout: FC<{children: React.ReactNode}> = ({children}) => {
    const {logout} = useActions()
    return (
        <Box>
            <Menu>
                <Button onClick={() => logout()}>Logout</Button>
            </Menu>
            {children}
        </Box>
    )
}