import * as AuthActionCreator from "./auth"
import * as PlayerActionCreators from './player'
import * as TrackActionCreator from "./track"

export default {
    ...AuthActionCreator,
    ...PlayerActionCreators,
    ...TrackActionCreator
}