type Config = {
  spotifyClientId: string
  clientUri: string
  expressSessionSecret: string
}

const config: Config = {
  spotifyClientId: 'your_spotify_client_id',
  clientUri: 'http://localhost:3000',
  expressSessionSecret: 'some_random_string',
}

export default config
