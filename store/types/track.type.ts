import {IComment, ITrackResponse} from "../../models/models/TrackResponse";

export interface ITrack {
    id: number
    name: string
    artist: string
    text: string
    listens: number
    picture: string
    audio: string
    userId: number
    albomId: any
    comments: IComment[]
}

export interface TrackState {
    tracks: ITrackResponse[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrackResponse[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction
