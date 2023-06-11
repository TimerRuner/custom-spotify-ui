import React from 'react';
import {ITrack} from "../store/types/track.type";
import {useRouter} from "next/router";
import {useActions} from "../hooks/actionCreator";
import {useTypeSelector} from "../hooks/useSelector";
import {Card, Flex, IconButton, Text} from "@chakra-ui/react";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {ITrackResponse} from "../models/models/TrackResponse";

interface TrackItemProps {
    track: ITrackResponse;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const {meta} = useTypeSelector(store => store.track)

    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    return (
        <Card onClick={() => router.push('/tracks/' + track.id)}>
            <IconButton aria-label="content" onClick={play}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <img width={70} height={70} src={meta.trackPicture}/>
            <Flex flexDirection="column" style={{width: 200, margin: '0 20px'}}>
                <Text>{track.name}</Text>
                <Text style={{fontSize: 12, color: 'gray'}}>{track.artist}</Text>
            </Flex>
            {active && <div>02:42 / 03:22</div>}
            <IconButton aria-label="content" onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;
