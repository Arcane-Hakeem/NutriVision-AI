export default function StatCard({ label, value, unit, note, icon: Icon, accent = '#eaf4ec' }) {
  return (
    <article className="rounded-2xl border border-[#e8ece5] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-3 text-2xl font-bold">{value}<span className="ml-1 text-sm font-medium text-gray-500">{unit}</span></p>
        </div>
        {Icon && <div className="rounded-xl p-3 text-[#21633c]" style={{ backgroundColor: accent }}><Icon size={21} /></div>}
      </div>
      {note && <p className="mt-4 text-xs text-gray-500">{note}</p>}
    </article>
  )
}
