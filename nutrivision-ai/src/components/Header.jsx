import { Menu, Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
const pageNames = { '/dashboard': 'Dashboard', '/scanner': 'AI Food Scanner', '/analytics': 'Analytics', '/history': 'Meal History', '/foods': 'Food Library', '/settings': 'Settings' }
export default function Header({ onMenuClick }) {
  const location = useLocation()
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#e4e9e1] bg-white/95 px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-lg p-2 hover:bg-gray-100 md:hidden"><Menu size={21} /></button>
        <h1 className="text-lg font-bold text-[#25352b]">{pageNames[location.pathname] || 'NutriVision AI'}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-[#f7f8f4] px-3 py-2 lg:flex">
          <Search size={16} className="text-gray-400" /><span className="text-sm text-gray-400">Search</span>
        </div>
        <button className="rounded-xl border border-gray-100 p-2.5 text-gray-600 hover:bg-gray-50"><Bell size={19} /></button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcecdf] text-sm font-bold text-[#21633c]">N</div>
      </div>
    </header>
  )
}
