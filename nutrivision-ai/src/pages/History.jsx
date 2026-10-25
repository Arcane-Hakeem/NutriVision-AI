import { Link } from 'react-router-dom'
import { History as HistoryIcon, ScanLine } from 'lucide-react'

export default function History() {
  return (
    <section className="rounded-2xl border border-[#e8ece5] bg-white p-8 text-center sm:p-14">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf4ec] text-[#21633c]">
        <HistoryIcon size={28} />
      </div>
      <h2 className="mt-5 text-2xl font-bold">Meal History</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        Your analyzed meals will appear here once meal saving is implemented.
      </p>
      <Link to="/scanner" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#21633c] px-5 py-3 text-sm font-semibold text-white">
        <ScanLine size={18} /> Scan your first meal
      </Link>
    </section>
  )
}
