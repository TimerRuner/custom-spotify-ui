import React from 'react';
import TrackItem from "./TrackItem";
import {Box, Grid} from "@chakra-ui/react";
import {ITrackResponse, ITracks} from "../models/models/TrackResponse";

interface TrackListProps {
    tracks: ITracks[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {

    return (
        <Grid flexDirection="column">
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track.id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;
