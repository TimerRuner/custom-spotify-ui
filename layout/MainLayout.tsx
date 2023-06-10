import React from 'react';
import Navbar from "../components/Navbar";
import { Container } from '@chakra-ui/react'
import Player from "../components/Player";
import Head from "next/head";
import {EColor} from "../models/colors/colors";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
           children,
           title,
            description,
            keywords
       }) => {

    return (
        <>
            <Head>
                <title>{title || 'Music platform'}</title>
                <meta name="description" content={`Music platform for listening and spread musics` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Musics, bands, tracks, bands"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            <Container bg={EColor.green} maxW="100vw" height="calc(100vh - 72px)" style={{padding: '90px 0'}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;
