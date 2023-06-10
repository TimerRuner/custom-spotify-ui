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
    icon?: As
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
         left, right, onChange, icon
     }) => {
        return (
            <Flex>
                <RangeSlider width="200px" onChangeEnd={onChange} mr={4} aria-label={['min', 'max']} min={0} max={100} step={1} defaultValue={[left, right]}>
                    <RangeSliderTrack bg='tomato' >
                        <RangeSliderFilledTrack bg='red.100' />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                        <Box color='tomato' as={icon} />
                    </RangeSliderThumb>
                </RangeSlider>
                <Flex alignItems="center">
                    <Text>{left} / {right}</Text>
                </Flex>
            </Flex>
        );
    };

export default TrackProgress;
