import {TrackAction, TrackActionTypes, TrackState} from "../types/track.type";

const initialState: TrackState = {
    tracks: [],
    totalCount: 0,
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, error: '', tracks: action.payload}
        case TrackActionTypes.FETCH_TOTAL_COUNT:
            return {...state, error: '', totalCount: action.payload}
        default:
            return state
    }
}
