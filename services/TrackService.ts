import $api from "../http"
import { AxiosResponse } from "axios"
import {ITrackResponse} from "../models/models/TrackResponse";

export default class TrackService {
    static async fetchTracks(): Promise<AxiosResponse<ITrackResponse[]>> {
        return $api.get<ITrackResponse[]>("/tack/all")
    }

}
