import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')!
const root = createRoot(container)

// No strict mode because of spotify oauth refreshing revoking tokens
root.render(<App />)
