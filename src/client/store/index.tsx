import type { SearchResults, Video, SpotifyMeta, MetaFields } from '../types'
import createStore from './createStore'

export const [useSearchLoading, setSearchLoading, getSearchLoading] =
  createStore<boolean>(false)

export const [useSearchResults, setSearchResults, getSearchResults] =
  createStore<{
    query: string
    isFetched: boolean
    msg: string
    results: SearchResults
  }>({
    query: '',
    isFetched: false,
    msg: 'Search for a song...',
    results: [],
  })

export const [useSearchQuery, setSearchQuery, getSearchQuery] =
  createStore<string>('')

export const [
  useSearchSuggestions,
  setSearchSuggestions,
  getSearchSuggestions,
] = createStore<string[]>([])

export const [useVideo, setVideo, getVideo] = createStore<Video | null>(null)

export const [useSpotifyMeta, setSpotifyMeta, getSpotifyMeta] =
  createStore<SpotifyMeta>({
    videoId: undefined,
    currentIndex: 0,
    isAuthorized: localStorage.getItem('spotify_refresh_token') ? true : false,
    results: [],
  })

export const [useMetaFields, setMetaFields, getMetaFields] =
  createStore<MetaFields>({
    title: '',
    album: '',
    artist: '',
    genre: '',
    date: '',
    year: '',
    track: 0,
  })
