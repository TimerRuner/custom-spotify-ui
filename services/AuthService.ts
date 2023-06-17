import $api from "../http"
import { AxiosResponse } from "axios"
import {AuthResponse, RoleResponse} from "../models/models/AuthResponse"

export default class AuthService {
    static async login(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/login", { email, password })
    }

    static async registration(
        email: string,
        password: string,
        fullName: string,
        role: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/registration", { email, password, fullName, role })
    }

    static async logout(): Promise<void> {
        return $api.post("/auth/logout", {}, { withCredentials: true })
    }

    static async getAllRoles(): Promise<AxiosResponse<RoleResponse>> {
        return $api.get("/role/getAll")
    }

    static async refreshAuth() {
        return await $api.get<AuthResponse>(
            `/auth/refresh`,
            { withCredentials: true }
        )
    }

}
