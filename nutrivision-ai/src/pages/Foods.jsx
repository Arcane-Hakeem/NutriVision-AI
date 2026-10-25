import { Apple } from 'lucide-react'

export default function Foods() {
  return (
    <section className="rounded-2xl border border-[#e8ece5] bg-white p-8 text-center sm:p-14">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf4ec] text-[#21633c]">
        <Apple size={28} />
      </div>
      <h2 className="mt-5 text-2xl font-bold">Food Library</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        This page will show supported food categories and nutrition information from your reference dataset.
      </p>
      <p className="mt-4 text-xs text-gray-400">Connect your nutrition dataset to populate this library.</p>
    </section>
  )
}
