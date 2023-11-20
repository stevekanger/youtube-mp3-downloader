import './styles/App.css'
import PageContainer from './components/PageContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import Video from './components/Video'
import SpotifyAuthCallback from './components/SpotifyAuthCallback'

export default function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchResults />} />
          <Route path='/video/:videoId' element={<Video />} />
          <Route
            path='/auth/spotify/callback'
            element={<SpotifyAuthCallback />}
          />
        </Routes>
      </PageContainer>
    </BrowserRouter>
  )
}
