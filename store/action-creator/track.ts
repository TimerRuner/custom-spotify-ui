import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../types/track.type";
import TrackService from "../../services/TrackService";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await TrackService.fetchTracks()
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error track fetching'
            })
        }
    }
}
