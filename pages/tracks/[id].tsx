import React, {useEffect, useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import {useRouter} from "next/router";
import {useInput} from "../../hooks/useInput";
import {Button, Flex, Text, Input, Box, Heading, Card, InputGroup, IconButton} from "@chakra-ui/react";
import TrackService from "../../services/TrackService";
import {ERoutes} from "../../models/constants/routes";
import {useActions} from "../../hooks/actionCreator";
import {useTypeSelector} from "../../hooks/useSelector";
import {EColor} from "../../models/colors/colors";
import {Pause, PlayArrow} from "@mui/icons-material";

const TrackPage = () => {
    const [track, setTrack] = useState(null)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')
    const {query} = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const {pause, active} = useTypeSelector(store => store.player)

    useEffect(() => {
        if(query.id){
            TrackService.getTrackById(query.id).then((res) => setTrack(res?.data))
        }
    }, [query])

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

    const play = (e) => {
        e.stopPropagation()
        if(pause) {
            setActiveTrack(track)
            playTrack(track.id)
        } else {
            pauseTrack()
        }
    }

    const backHandler = () => {
        router.push(ERoutes.TRACKS)
        setActiveTrack(track)
        pauseTrack()
    }

    return (
        <MainLayout
            title={"Music platform - " + track?.name + " - " + track?.artist}
            keywords={'Music, artist, ' + track?.name + ", " + track?.artist}
        >
            <Flex justifyContent="center" alignItems="center">
                <Card p={4} color="black" display="inline-block">
                    <Flex justifyContent="space-between">
                        <IconButton bg={EColor.green} aria-label='Options' onClick={play}>
                            {!pause && active?.id === track?.id
                                ? <Pause/>
                                : <PlayArrow/>
                            }
                        </IconButton>
                        <Button
                            onClick={backHandler}
                        >
                            Back to list
                        </Button>
                    </Flex>
                    <Flex style={{margin: '20px 0'}}>
                        <img src={track?.picture} width={200} height={200}/>
                        <Box style={{marginLeft: 30}}>
                            <Heading as="h1">Track name - {track?.name}</Heading>
                            <Heading as="h1">Artist - {track?.artist}</Heading>
                            <Heading as="h1">Listens - {track?.listens}</Heading>
                        </Box>
                    </Flex>
                    <Heading as="h1">Track's text</Heading>
                    <Text>{track?.text}</Text>
                    <Heading as="h2">Комментарии</Heading>
                    <Flex flexDirection="column" mt={5}>
                        <Flex flexDirection="column" mb={3}>
                            <Text>Your name</Text>
                            <Input
                                {...username}
                            />
                        </Flex>
                        <Flex flexDirection="column" mb={3}>
                            <Text>Comment</Text>
                            <Input
                                {...text}
                            />
                        </Flex>
                        <Button onClick={addComment}>Send</Button>
                    </Flex>
                    <Box mt={3}>
                        {track?.comments?.map(comment =>
                            <Card p={4} mb={3}>
                                <Text>Author - {comment?.name}</Text>
                                <Text>Comment - {comment?.text}</Text>
                            </Card>
                        )}
                    </Box>
                </Card>
            </Flex>
        </MainLayout>
    );
};

export default TrackPage;

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//     const response = await TrackService.getTrackById(params.id)
//     return {
//         props: {
//             serverTrack: response.data
//         }
//     }
// }
