import React from 'react';
import MainLayout from "../../layout/MainLayout";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creator/track";
import {Box, Button, Card, Grid, Heading} from "@chakra-ui/react";
import {useTypeSelector} from "../../hooks/useSelector";

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypeSelector(state => state.track)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid justifyContent='space-between'>
                            <Heading as="h1">Track list</Heading>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Create track
                            </Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})
