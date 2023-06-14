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

export const searchTracks = (query: string, offset: number = 0, limit: number = 5) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            if(query) {
                const response = await TrackService.searchTrack(query, offset, limit)
                dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data.tracks})
                dispatch({type: TrackActionTypes.FETCH_TOTAL_COUNT, payload: response.data.totalCount})
            } else {
                const response = await TrackService.fetchTracks(0)
                dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data.tracks})
                dispatch({type: TrackActionTypes.FETCH_TOTAL_COUNT, payload: response.data.totalCount})
            }
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Uncorrect fetch params'
            })
        }
    }
}

export const setSearchQuery = (query: string) => ({
    type: TrackActionTypes.SET_SEARCH_QUERY,
    payload: query
})
