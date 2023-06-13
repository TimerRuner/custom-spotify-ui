import React, {useState} from 'react';
import {ITrack} from "../../store/types/track.type";
import MainLayout from "../../layout/MainLayout";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {useInput} from "../../hooks/useInput";
import {Button, Flex, Text, Input, Box, Heading} from "@chakra-ui/react";
import TrackService from "../../services/TrackService";
import {useTypeSelector} from "../../hooks/useSelector";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await TrackService.createComment({
                name: username.value,
                text: text.value,
                trackId: track.id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={"Music platform - " + track.name + " - " + track.artist}
            keywords={'Music, artist, ' + track.name + ", " + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <Flex style={{margin: '20px 0'}}>
                <img src={track.picture} width={200} height={200}/>
                <Box style={{marginLeft: 30}}>
                    <Heading as="h1">Track name - {track.name}</Heading>
                    <Heading as="h1">Artist - {track.artist}</Heading>
                    <Heading as="h1">Listens - {track.listens}</Heading>
                </Box>
            </Flex>
            <Heading as="h1">Track's text</Heading>
            <Text>{track.text}</Text>
            <Heading as="h2">Комментарии</Heading>
            <Flex flexDirection="column">
                <Text>Your name</Text>
                <Input
                    {...username}
                />
                <Text>Comment</Text>
                <Input
                    {...text}
                />
                <Button onClick={addComment}>Send</Button>
            </Flex>
            <Box>
                {track.comments.map(comment =>
                    <Box>
                        <Text>Author - {comment.name}</Text>
                        <Text>Comment - {comment.text}</Text>
                    </Box>
                )}
            </Box>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await TrackService.getTrackById(params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}
