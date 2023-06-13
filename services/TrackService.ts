import $api from "../http"
import { AxiosResponse } from "axios"
import {IComment, ITrackResponse} from "../models/models/TrackResponse";

export default class TrackService {
    static async fetchTracks(offset: number = 0, limit: number = 10): Promise<AxiosResponse<ITrackResponse[]>> {
        return $api.get<ITrackResponse[]>(`/track/all?offset=${offset}&limit=${limit}`)
    }

    static async createTrack(dto: any): Promise<AxiosResponse<ITrackResponse>> {
        return $api.post<ITrackResponse>("/track/create", dto)
    }

    static async getTrackById(id: string | string[]): Promise<AxiosResponse<ITrackResponse>> {
        return $api.get(`/track/${id}`)
    }

    static async deleteTrackById(id: number): Promise<void> {
        return $api.delete(`/track/delete/${id}`)
    }

    static async createComment(
      dto: {name: string, text: string, trackId: number}
    ): Promise<AxiosResponse<IComment>> {
        return $api.post("/comment/create", dto)
    }
}
