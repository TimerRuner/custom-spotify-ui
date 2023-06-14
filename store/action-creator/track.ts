import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../types/track.type";
import TrackService from "../../services/TrackService";

export const fetchTracks = (offset?: number) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TrackService.fetchTracks(offset || 0)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data.tracks})
            dispatch({type: TrackActionTypes.FETCH_TOTAL_COUNT, payload: response.data.totalCount})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error track fetching'
            })
        }
    }
}
