import React, {useEffect} from 'react';
import TrackProgress from "./TrackProgress";
import {useTypeSelector} from "../hooks/useSelector";
import {useActions} from "../hooks/actionCreator";
import {Flex, IconButton, Text} from "@chakra-ui/react";
import {PlayArrow, Pause, VolumeUp} from "@mui/icons-material";
import {EColor} from "../models/colors/colors";
import {RangeIcon} from "../icons/RangeIcon";

let audio;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypeSelector(store => store.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            playTrack()
            audio.play()
        }
    }, [active])

    useEffect(() => {
        if(pause) {
            audio.pause()
        } else {
            audio.play()
            setDuration(Math.ceil(audio.duration))
        }
    }, [pause])

    const setAudio = () => {
        if (active) {
            audio.src = active.audio
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
            <TrackProgress isTranslate={true} icon={RangeIcon} left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <TrackProgress icon={VolumeUp} left={volume} right={100} onChange={changeVolume}/>
        </Flex>
    );
};

export default Player;
