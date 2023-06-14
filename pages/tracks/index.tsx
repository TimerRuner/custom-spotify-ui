import React, {useEffect} from 'react';
import MainLayout from "../../layout/MainLayout";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {Box, Button, Card, Flex, Grid, Heading} from "@chakra-ui/react";
import {useTypeSelector} from "../../hooks/useSelector";
import {useActions} from "../../hooks/actionCreator";
import {Pagination} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material/styles';

const Index = () => {
    const chakraUiTheme = extendTheme();
    const muiTheme = createTheme(chakraUiTheme);
    const router = useRouter()
    const {tracks, error, totalCount, searchQuery} = useTypeSelector(state => state.track)
    const {user} = useTypeSelector(state => state.auth)
    const {fetchTracks, searchTracks} = useActions()
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        fetchTracks()
    }, [])

    useEffect(() => {
        if(!searchQuery) {
            setPage(1)
        }
    }, [searchQuery])

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        if(searchQuery){
            if(value >= 2){
                searchTracks(searchQuery,(value - 1) * 5)
            } else {
                searchTracks(searchQuery,0)
            }
        } else {
            if(value >= 2){
                fetchTracks((value - 1) * 5)
            } else {
                fetchTracks(0)
            }
        }
    }

    return (
        <MainLayout title={"Track list - music platform"}>
            <ThemeProvider theme={muiTheme}>
                <Grid justifyContent='center' gap={4}>
                    <Card style={{width: 900}} p={4}>
                        <Flex flexDirection="column" alignItems="center" justifyContent="center">
                            <Box p={3}>
                                <Flex justifyContent='space-around' gap={4}>
                                    <Heading as="h1">Track list</Heading>
                                    {user.role === "CREATOR" ? (
                                        <Button onClick={() => router.push('/tracks/create')}>
                                            Create track
                                        </Button>) : null
                                    }
                                </Flex>
                            </Box>
                            <TrackList tracks={tracks}/>
                            <Pagination count={Math.ceil(totalCount/5)} page={page} onChange={paginationHandler}/>
                        </Flex>
                    </Card>
                </Grid>
            </ThemeProvider>
        </MainLayout>
    );
};

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks())
// })
