import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@theme/theme.provider.tsx'
import App from './App.tsx'
import { Parent } from '@services/parent/index.ts';


createRoot(document.getElementById('conversu-plugin')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Parent.Provider>
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
        </Parent.Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
