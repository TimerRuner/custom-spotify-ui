import React, {useEffect} from 'react';
import TrackProgress from "./TrackProgress";
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";
import {Box, Flex, Grid, IconButton, Text} from "@chakra-ui/react";
import {PlayArrow, Pause, VolumeUp} from "@mui/icons-material";
import {EColor} from "../models/colors/colors";
import {RangeIcon} from "../icons/RangeIcon";

let audio;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypeSelector(store => store.player)
    const {meta} = useTypeSelector(store => store.track)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = meta.trackAudio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (value: number[]) => {
        audio.volume = Number(value[0]) / 100
        setVolume(Number(value[0]))
    }
    const changeCurrentTime = (value: number[]) => {
        audio.currentTime = Number(value[0])
        setCurrentTime(Number(value[0]))
    }

    if (!active) {
        return null
    }

    return (
        <Flex width="100%" roundedTopRight={6} roundedTopLeft={6} bg="black" justifyContent="space-around" align-items="center" p={4} gap={5} position="absolute" bottom={0}>
            <IconButton bg={EColor.green} aria-label='Options' onClick={play}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Flex flexDirection="column" alignItems="center" style={{width: 200, margin: '0 20px'}}>
                <Text>{active?.name}</Text>
                <Text style={{fontSize: 12, color: 'gray'}}>{active?.artist}</Text>
            </Flex>
            <TrackProgress icon={RangeIcon} left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <TrackProgress icon={VolumeUp} left={volume} right={100} onChange={changeVolume}/>
        </Flex>
    );
};

export default Player;
