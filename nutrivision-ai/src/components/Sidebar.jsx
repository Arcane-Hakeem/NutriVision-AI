import { LayoutDashboard, ScanLine, ChartNoAxesCombined, History, Apple, Settings, Leaf, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scanner', label: 'AI Food Scanner', icon: ScanLine },
  { to: '/analytics', label: 'Nutrition Analytics', icon: ChartNoAxesCombined },
  { to: '/history', label: 'Meal History', icon: History },
  { to: '/foods', label: 'Food Library', icon: Apple },
  { to: '/settings', label: 'Settings', icon: Settings },
]
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button onClick={onClose} className="fixed inset-0 z-40 bg-black/30 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#e4e9e1] bg-white p-5 transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#163d2a] text-white"><Leaf size={23} /></span>
            <span>
              <span className="block text-lg font-bold text-[#163d2a]">NutriVision</span>
              <span className="text-xs text-gray-500">AI Assistant</span>
            </span>
          </NavLink>
          <button className="md:hidden" onClick={onClose}><X size={20} /></button>
        </div>
        <nav className="flex-1 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive ? 'bg-[#eaf4ec] text-[#21633c]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon size={19} />{label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
