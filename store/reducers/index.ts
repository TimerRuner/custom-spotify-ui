import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {HYDRATE} from "next-redux-wrapper";

export const rootReducer = combineReducers({
    auth: authReducer
})

export type RooState = ReturnType<typeof rootReducer>

export const reducer = (state: any, action: any) => {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        return nextState
    } else {
        return rootReducer(state, action)
    }
}