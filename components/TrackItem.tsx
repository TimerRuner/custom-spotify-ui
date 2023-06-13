import React, {useState} from 'react';
import {ITrack} from "../store/types/track.type";
import {useRouter} from "next/router";
import {useActions} from "../hooks/actionCreator";
import {useTypeSelector} from "../hooks/useSelector";
import {Box, Card, Flex, IconButton, Spinner, Text} from "@chakra-ui/react";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {ITrackResponse} from "../models/models/TrackResponse";
import TrackService from "../services/TrackService";

interface TrackItemProps {
    track: ITrackResponse;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const {user} = useTypeSelector(store => store.auth)
    const {pause, active} = useTypeSelector(store => store.player)

    const play = (e) => {
        e.stopPropagation()
        if(active && active.id !== track.id){
            setActiveTrack(track)
            playTrack()
        } else {
            if(pause) {
                setActiveTrack(track)
                playTrack()
            } else {
                pauseTrack()
            }
        }
    }

    const deleteTrackHandler = async (e, id) => {
        e.stopPropagation();
        setLoading(true)
        await TrackService.deleteTrackById(id).finally(() => setLoading(false))
    }

    if(loading){
        return <Spinner size='xl' />
    }

    return (
        <Card onClick={() => router.push('/tracks/' + track.id)} mb={4}>
            <Flex gap={4} alignItems="center" p={4}>
                <IconButton aria-label="content" onClick={play}>
                    {!pause && active?.id === track.id
                        ? <Pause/>
                        : <PlayArrow/>
                    }
                </IconButton>
                <img width={70} height={70} src={track?.picture}/>
                <Flex flexDirection="column" style={{width: 200, margin: '0 20px'}}>
                    <Text>{track.name}</Text>
                    <Text style={{fontSize: 12, color: 'gray'}}>{track.artist}</Text>
                </Flex>
                {user.id === track.userId ? (
                    <IconButton aria-label="content" onClick={(e) => deleteTrackHandler(e, track.id)} style={{marginLeft: 'auto'}}>
                        <Delete/>
                    </IconButton>
                ) : null}

            </Flex>
        </Card>
    );
};

export default TrackItem;
