import {AuthActionConst, AuthActionTypes, IAuthState} from "../types/auth.type";
import {IUser} from "../../models/IUser";

export const initialState: IAuthState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    isAuthChecked: false
}

export const authReducer = (state: IAuthState = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case AuthActionConst.SET_AUTH:
            return {...state, isAuth: action.payload}
        case AuthActionConst.SET_LOADING:
            return {...state, isLoading: action.payload}
        case AuthActionConst.SET_USER:
            return {...state, user: action.payload}
        case AuthActionConst.SET_IS_AUTH_CHECK:
            return {...state, isAuthChecked: action.payload}
        default: return state
    }
}