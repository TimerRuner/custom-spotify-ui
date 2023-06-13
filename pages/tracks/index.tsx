import React, {useEffect} from 'react';
import MainLayout from "../../layout/MainLayout";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {Box, Button, Card, Flex, Grid, Heading} from "@chakra-ui/react";
import {useTypeSelector} from "../../hooks/useSelector";
import {useActions} from "../../hooks/actionCreator";

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypeSelector(state => state.track)
    const {user} = useTypeSelector(state => state.auth)
    const {fetchTracks} = useActions()

    useEffect(() => {
        fetchTracks()
    }, [])

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Track list - music platform"}>
            <Grid justifyContent='center' gap={4}>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Flex justifyContent='space-around'>
                            <Heading as="h1">Track list</Heading>
                            {user.role === "CREATOR" ? (
                                <Button onClick={() => router.push('/tracks/create')}>
                                    Create track
                                </Button>) : null
                            }
                        </Flex>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks())
// })
