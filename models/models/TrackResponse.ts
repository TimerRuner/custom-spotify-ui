export interface ITrackResponse {
    id: number
    name: string
    artist: string
    text: string
    listens: number
    picture: string
    audio: string
    userId: number
    albomId: any
    comments: Comment[]
}

export interface IComment {
    id: number
    text: string
    name: string
    userId: number
    trackId: number
    createdAt: string
    updatedAt: string
}

export interface ITrackCreateDto {
    name: string,
    text: string,
    artist: string,
    picture: File,
    audio: File
}