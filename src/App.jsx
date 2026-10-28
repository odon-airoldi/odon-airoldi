import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import IndexPage from './pages/IndexPage'
import CurriculumPagePrint from './pages/CurriculumPagePrint'
import Error404Page from './pages/Error404Page'
import { AppProvider } from './contexts/AppContext'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<IndexPage />} />
            {/* vecchia pagina cv, ora nella home: il link è già stato inviato, quindi
                reindirizza alla home. replace: /cv non resta nella cronologia */}
            <Route path="/cv" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/*" element={<Error404Page />} />
          <Route path="/print" element={<CurriculumPagePrint />} />
        </Routes>
      </AppProvider>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
