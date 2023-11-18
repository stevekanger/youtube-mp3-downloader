export type SpotifyTrackResults = {
  tracks: Tracks
}

export type SpotifyTrackItem = {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIDS
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: null | string
  track_number: number
  type: ItemType
  uri: string
}

type Tracks = {
  href: string
  items: SpotifyTrackItem[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

type Album = {
  album_type: AlbumTypeEnum
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: ReleaseDatePrecision
  total_tracks: number
  type: AlbumTypeEnum
  uri: string
}

type AlbumTypeEnum = 'album' | 'compilation' | 'single'

type Artist = {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: ArtistType
  uri: string
}

type ExternalUrls = {
  spotify: string
}

type ArtistType = 'artist'

type Image = {
  height: number
  url: string
  width: number
}

type ReleaseDatePrecision = 'day'

type ExternalIDS = {
  isrc: string
}

type ItemType = 'track'
