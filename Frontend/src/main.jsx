// main.jsx
// Entry point of the MentorMate app.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Import only createRoot, not ReactDOM
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
