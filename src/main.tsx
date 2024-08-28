import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@theme/theme.provider.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route
            path='/:token'
            element={<App />}
          />
          <Route
            path='*'
            element={<></>}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
