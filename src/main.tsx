import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider, consumeAuthHandoff } from './contexts/AuthContext'
import { NavBar } from './components/NavBar'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { CalendarPage } from './pages/CalendarPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { PageViewTracker } from './components/PageViewTracker'
import { DomainGuard } from './components/DomainGuard'
import { applyDomainEntryRoute } from './utils/siteDomain'
import './styles/globals.css'
import './firebase' // Initialize Firebase

// Rheina 에서 넘어온 로그인 정보를 먼저 저장한 뒤, 첫 화면(/ → /mem) 결정
consumeAuthHandoff()
applyDomainEntryRoute()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <PageViewTracker />
        <DomainGuard>
          <Routes>
            {/* MeM 달력 (첫 화면). /calendar 는 기존 링크 호환용 */}
            <Route path="/mem" element={<CalendarPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<Navigate to="/mem" replace />} />
          </Routes>
        </DomainGuard>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
