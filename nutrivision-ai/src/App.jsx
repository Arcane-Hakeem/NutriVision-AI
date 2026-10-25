import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import Analytics from './pages/Analytics'
import History from './pages/History'
import Foods from './pages/Foods'
import Settings from './pages/Settings'
function Page({ children }) { return <AppLayout>{children}</AppLayout> }
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Page><Dashboard /></Page>} />
      <Route path="/scanner" element={<Page><Scanner /></Page>} />
      <Route path="/analytics" element={<Page><Analytics /></Page>} />
      <Route path="/history" element={<Page><History /></Page>} />
      <Route path="/foods" element={<Page><Foods /></Page>} />
      <Route path="/settings" element={<Page><Settings /></Page>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
