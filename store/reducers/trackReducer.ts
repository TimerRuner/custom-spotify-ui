import {TrackAction, TrackActionTypes, TrackState} from "../types/track.type";

const initialState: TrackState = {
    tracks: [],
    meta: {
        trackPicture: "",
        trackAudio: ""
    },
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, error: '', tracks: action.payload}
        case TrackActionTypes.ADD_CURRENT_TRACK_META:
            return {...state, meta: action.payload}
        default:
            return state
    }
}
