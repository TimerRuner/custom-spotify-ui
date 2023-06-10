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
export interface ITrackMeta {
    trackPicture: string
    trackAudio: string
}

export interface TrackState {
    tracks: ITrackResponse[];
    meta: ITrackMeta
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    ADD_CURRENT_TRACK_META='ADD_CURRENT_TRACK_META'
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrackResponse[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

interface SetTrackMeta {
    type: TrackActionTypes.ADD_CURRENT_TRACK_META,
    payload: ITrackMeta
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction | SetTrackMeta
