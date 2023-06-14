import {IComment, ITrackResponse, ITracks} from "../../models/models/TrackResponse";

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
    tracks: ITracks[];
    error: string;
    totalCount: number
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    FETCH_TOTAL_COUNT = 'FETCH_TOTAL_COUNT'
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITracks[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

interface FetchTotalCount {
    type: TrackActionTypes.FETCH_TOTAL_COUNT
    payload: number
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction | FetchTotalCount
