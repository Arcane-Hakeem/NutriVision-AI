import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
export default function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#f7f8f4]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="min-h-screen md:pl-64">
        <Header onMenuClick={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
