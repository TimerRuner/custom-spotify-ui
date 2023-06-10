import * as AuthActionCreator from "./auth"
import * as PlayerActionCreators from './player'

export default {
    ...AuthActionCreator,
    ...PlayerActionCreators
}