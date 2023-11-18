export * from './SpotifyTrackResults'

export type SearchResult = {
  id: string
  url: string
  title: string
  duration: string
  thumbnailUrl: string
}

export type SearchResults = SearchResult[]

export type Video = {
  id: string
  title: string
  url: string
  duration: string
  thumbnailUrl: string
}

export type SpotifyMeta = {
  videoId: string | undefined
  isAuthorized: boolean
  currentIndex: number
  results: MetaFields[]
}

export type MetaFields = {
  title: string
  album: string
  artist: string
  genre: string
  date: string
  year: string
  track: number
}
