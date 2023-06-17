import {IUser} from "../../models/IUser";

export interface IAuthState {
    user: IUser
    isAuth: boolean
    isLoading: boolean,
    isAuthChecked: boolean
}

export enum AuthActionConst {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR",
    SET_IS_AUTH_CHECK = "SET_IS_AUTH_CHECK"
}

export interface AuthSetAuth {
    type: AuthActionConst.SET_AUTH,
    payload: boolean
}

export interface AuthSetUser {
    type: AuthActionConst.SET_USER,
    payload: IUser
}


export interface IsAuthCheck {
    type: AuthActionConst.SET_IS_AUTH_CHECK,
    payload: boolean
}

export interface AuthSetLoading {
    type: AuthActionConst.SET_LOADING,
    payload: boolean
}

export interface AuthSetError{
    type: AuthActionConst.SET_ERROR,
    payload: string
}

export type AuthActionTypes = AuthSetAuth | AuthSetLoading | AuthSetUser | AuthSetError | IsAuthCheck