export type MediaType = 'image' | 'video' | 'audio'


export interface MediaItem {
    id: string
    type: MediaType
    url: string // for day1 we'll accept URLs
    caption?: string
}


export interface HistoricalEvent {
    id: string
    year?: number
    title: string
    description: string
    mediaIds?: string[]
}


export interface Country {
    id: string
    name: string
    isoCode?: string
    region?: string
    summary?: string
    topAttractions: string[]
    media: MediaItem[]
    history: HistoricalEvent[]
    traditions: { text: string; mediaIds: string[] }[]
    lifestyle: { description: string; visualIds: string[] }
    createdAt: string
    lastEditedAt?: string
}