import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { day: 'Mon', protein: 65, carbs: 190, fat: 55 },
  { day: 'Tue', protein: 78, carbs: 220, fat: 60 },
  { day: 'Wed', protein: 58, carbs: 175, fat: 48 },
  { day: 'Thu', protein: 82, carbs: 205, fat: 63 },
  { day: 'Fri', protein: 70, carbs: 195, fat: 52 },
  { day: 'Sat', protein: 88, carbs: 230, fat: 68 },
  { day: 'Sun', protein: 68, carbs: 156, fat: 48 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Nutrition Analytics</h2>
        <p className="mt-2 text-sm text-gray-500">Explore your macronutrient trends over time.</p>
      </section>

      <section className="rounded-2xl border border-[#e8ece5] bg-white p-5 sm:p-7">
        <h3 className="font-bold">Daily macronutrients</h3>
        <p className="mt-1 text-sm text-gray-500">Example values in grams · replace with recorded meals</p>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid stroke="#edf0eb" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="protein" fill="#2e7d52" radius={[4, 4, 0, 0]} />
              <Bar dataKey="carbs" fill="#e9a23b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fat" fill="#7aa6c2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>?? Protein</span>
          <span>?? Carbohydrates</span>
          <span>?? Fat</span>
        </div>
      </section>
    </div>
  )
}
