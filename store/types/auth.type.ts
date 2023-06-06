import {IUser} from "../../models/IUser";

export interface IAuthState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
}

export enum AuthActionConst {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR"
}

export interface AuthSetAuth {
    type: AuthActionConst.SET_AUTH,
    payload: boolean
}

export interface AuthSetUser {
    type: AuthActionConst.SET_USER,
    payload: IUser
}

export interface AuthSetLoading {
    type: AuthActionConst.SET_LOADING,
    payload: boolean
}

export interface AuthSetError{
    type: AuthActionConst.SET_ERROR,
    payload: string
}

export type AuthActionTypes = AuthSetAuth | AuthSetLoading | AuthSetUser | AuthSetError