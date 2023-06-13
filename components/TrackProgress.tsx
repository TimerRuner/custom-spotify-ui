import React from 'react';
import {
    As,
    Box,
    Flex,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Text,
} from "@chakra-ui/react";
import {RangeIcon} from "../icons/RangeIcon";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: number[]) => void
    icon?: As,
    isTranslate?: boolean
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
         left, right, onChange, icon, isTranslate
     }) => {
        const viewDuration = (seconds: number): string => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds}`
        }

        return (
            <Flex>
                <RangeSlider width="200px" onChange={onChange} mr={4} aria-label={['min', 'max']} step={1} value={[left, right]} min={0} max={right} defaultValue={[0, right]}>
                    <RangeSliderTrack bg='tomato' >
                        <RangeSliderFilledTrack bg='red.100' />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                        <Box color='tomato' as={icon} />
                    </RangeSliderThumb>
                </RangeSlider>
                <Flex alignItems="center">
                    {isTranslate ? <Text>{viewDuration(left)} / {viewDuration(right)}</Text> : <Text>{left} / {right}</Text>}
                </Flex>
            </Flex>
        );
    };

export default TrackProgress;
