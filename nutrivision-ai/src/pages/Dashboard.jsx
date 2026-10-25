import { Flame, Beef, Wheat, Droplets, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
export default function Dashboard() {
  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Good things start on your plate.</h2>
          <p className="text-sm text-gray-500">Your nutrition overview at a glance.</p>
        </div>
        <Link to="/scanner" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#21633c] px-5 py-3 text-sm font-semibold text-white">
          <ScanLine size={18} /> Scan a meal
        </Link>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Calories" value="1,420" unit="kcal" note="Demo data" icon={Flame} />
        <StatCard label="Protein" value="68" unit="g" note="Demo data" icon={Beef} />
        <StatCard label="Carbs" value="156" unit="g" note="Demo data" icon={Wheat} />
        <StatCard label="Fats" value="48" unit="g" note="Demo data" icon={Droplets} />
      </section>
    </div>
  )
}
