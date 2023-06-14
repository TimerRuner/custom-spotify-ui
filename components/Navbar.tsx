import * as React from 'react';
import {useRouter} from "next/router";
import {
    Box,
    Button,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex, Heading,
    IconButton, Input, InputGroup, InputLeftElement,
    List,
    ListItem,
    MenuButton,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {Menu} from "@chakra-ui/menu";
import {BurgerIcon} from "../icons/BurgerIcon";
import {useActions} from "../hooks/actionCreator";
import {ERoutes} from "../models/constants/routes";
import {EColor} from "../models/colors/colors";
import Cookies from "js-cookie";
import {SearchIcon} from "@chakra-ui/icons";
import {setSearchQuery} from "../store/action-creator/track";


const menuItems = [
    {text: 'Main page', href: ERoutes.MAIN},
    {text: 'Tracks', href: ERoutes.TRACKS},
    {text: 'Albums', href: ERoutes.ALBUMS},
]

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const {logout, searchTracks, setSearchQuery} = useActions()
    const logoutHandler = () => {
        logout()
        const accessToken = localStorage.getItem("token")
        if(!accessToken) return Cookies.remove("user")
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchTracks(e.target.value)
        setSearchQuery(e.target.value)
    }

    return (
        <Box bg={EColor.green}>
            <Menu>
                <Flex gap={4} p={4} justifyContent="space-between" alignItems="center">
                    <MenuButton
                        onClick={onOpen}
                        as={IconButton}
                        aria-label='Options'
                        icon={
                            <Box width="34px" height="34px">
                                <BurgerIcon width="34px" height="34px"/>
                            </Box>
                        }
                        variant='outline'
                    />
                    <InputGroup width="250px">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input onChange={searchHandler} bg="white" color="black" type="text" placeholder="Search..." />
                    </InputGroup>
                    <Button bg={EColor.greenLight}  onClick={logoutHandler}>Logout</Button>
                </Flex>
            </Menu>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent p={4}>
                    <Heading mb={4} as="h2">Menu</Heading>
                    <List>
                        {menuItems.map(({text, href}, index) => (
                            <ListItem
                                key={index}
                                cursor="pointer"
                                pt={3}
                                pb={3}
                                onClick={() => router.push(href)}
                            >
                                <Text _hover={{textDecoration: "underline"}}>{text}</Text>
                            </ListItem>
                        ))}
                    </List>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
