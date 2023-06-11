import $api from "../http"
import { AxiosResponse } from "axios"
import {IComment, ITrackResponse} from "../models/models/TrackResponse";

export default class TrackService {
    //todo add queries offset and limit
    static async fetchTracks(): Promise<AxiosResponse<ITrackResponse[]>> {
        return $api.get<ITrackResponse[]>("/track/all")
    }

    static async createTrack(dto: any): Promise<AxiosResponse<ITrackResponse>> {
        return $api.post<ITrackResponse>("/track/create", dto)
    }

    static async getTrackById(id: string | string[]): Promise<AxiosResponse<ITrackResponse>> {
        return $api.get(`/track/${id}`)
    }

    static async createComment(
      dto: {name: string, text: string, trackId: number}
    ): Promise<AxiosResponse<IComment>> {
        return $api.post("/comment/create", dto)
    }
}
