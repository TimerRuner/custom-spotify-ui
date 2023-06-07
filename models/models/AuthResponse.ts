import { IUser } from "../IUser"

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface RoleResponse {
    id: number,
    description: string,
    value: string
}
