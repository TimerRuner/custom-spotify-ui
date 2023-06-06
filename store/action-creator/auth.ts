import {Dispatch} from "react";
import {AuthActionConst, AuthActionTypes} from "../types/auth.type";
import AuthService from "../../services/AuthService";
import {IUser} from "../../models/IUser";
import axios from "axios";
import {API_URL} from "../../http";
import {AuthResponse} from "../../models/models/AuthResponse";

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            dispatch({type: AuthActionConst.SET_LOADING, payload: true})

            const response = await AuthService.login(email, password)
            localStorage.setItem("token", response.data.accessToken)

            dispatch({type: AuthActionConst.SET_AUTH, payload: true})

            dispatch({type: AuthActionConst.SET_USER, payload: response.data.user})

        } catch (error) {
            dispatch({type: AuthActionConst.SET_ERROR, payload: String(error)})
        } finally {
            dispatch({type: AuthActionConst.SET_LOADING, payload: false})
        }
    }
}

export const loginGoogle = (accessToken: string, user: IUser) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            dispatch({type: AuthActionConst.SET_LOADING, payload: true})

            localStorage.setItem("token", accessToken)

            dispatch({type: AuthActionConst.SET_AUTH, payload: true})

            dispatch({type: AuthActionConst.SET_USER, payload: user})

        } catch (error) {
            dispatch({type: AuthActionConst.SET_ERROR, payload: String(error)})
        } finally {
            dispatch({type: AuthActionConst.SET_LOADING, payload: false})
        }
    }
}

export const registration = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            dispatch({type: AuthActionConst.SET_LOADING, payload: true})

            const response = await AuthService.registration(email, password)
            localStorage.setItem("token", response.data.accessToken)

            dispatch({type: AuthActionConst.SET_AUTH, payload: true})

            dispatch({type: AuthActionConst.SET_USER, payload: response.data.user})

        } catch (error) {
            dispatch({type: AuthActionConst.SET_ERROR, payload: String(error)})
        } finally {
            dispatch({type: AuthActionConst.SET_LOADING, payload: false})
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
       try {
           dispatch({type: AuthActionConst.SET_LOADING, payload: true})

           await AuthService.logout()

           localStorage.removeItem("token")

           dispatch({type: AuthActionConst.SET_AUTH, payload: false})

           dispatch({type: AuthActionConst.SET_USER, payload: {} as IUser})
       } catch (error) {
           dispatch({type: AuthActionConst.SET_ERROR, payload: String(error)})
       } finally {
           dispatch({type: AuthActionConst.SET_LOADING, payload: false})
       }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            dispatch({type: AuthActionConst.SET_LOADING, payload: true})

            const response = await axios.get<AuthResponse>(
                `${API_URL}/auth/refresh`,
                { withCredentials: true }
            )

            localStorage.setItem("token", response.data.accessToken)

            dispatch({type: AuthActionConst.SET_AUTH, payload: true})

            dispatch({type: AuthActionConst.SET_USER, payload: response.data.user})

        } catch (error) {
            dispatch({type: AuthActionConst.SET_ERROR, payload: String(error)})
        } finally {
            dispatch({type: AuthActionConst.SET_LOADING, payload: false})
        }
    }
}