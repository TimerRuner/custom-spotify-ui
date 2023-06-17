import {PlayerAction, PlayerActionTypes} from "../types/player.type";
import {ITracks} from "../../models/models/TrackResponse";
import {Dispatch} from "react";
import TrackService from "../../services/TrackService";

export const playTrack = (id: number) => {
    return async (dispatch: Dispatch<PlayerAction>) => {
        await TrackService.listenTrack(id)
        dispatch({type: PlayerActionTypes.PLAY})
    }
}
export const pauseTrack = (): PlayerAction => {
    return {type: PlayerActionTypes.PAUSE}
}
export const setDuration = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_DURATION, payload}
}
export const setVolume = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_VOLUME, payload}
}
export const setCurrentTime = (payload: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME, payload}
}
export const setActiveTrack = (payload: ITracks): PlayerAction => {
    return {type: PlayerActionTypes.SET_ACTIVE, payload}
}
