import session, { SessionOptions } from 'express-session'
import path from 'path'
import express from 'express'
import config from '../config'

// controllers
import search from './controllers/search'
import convertAndDownload from './controllers/convertAndDownload'

declare module 'express-session' {
  interface SessionData {
    spotify?: {
      query?: string
      state?: string
      referer?: string
    }
  }
}

const app = express()

const sessionOptions: SessionOptions = {
  secret: config.expressSessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true,
  },
}

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))
app.use(session(sessionOptions))

app.post('/api/search', search)
app.post('/api/convert-and-download', convertAndDownload)

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})
