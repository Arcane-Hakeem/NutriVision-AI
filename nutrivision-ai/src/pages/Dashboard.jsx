import { useEffect, useState } from 'react'
import { Flame, Beef, Wheat, Droplets, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { getMeals } from '../services/mealStorage'

export default function Dashboard() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const loadMeals = () => {
      setMeals(getMeals())
    }

    loadMeals()

    // Refresh totals when returning to the dashboard
    window.addEventListener('focus', loadMeals)

    return () => {
      window.removeEventListener('focus', loadMeals)
    }
  }, [])

  // Calculate today's nutrition totals
  const today = new Date().toDateString()

  const todaysMeals = meals.filter(
    (meal) => new Date(meal.createdAt).toDateString() === today
  )

  const totals = todaysMeals.reduce(
    (sum, meal) => {
      const nutrition = meal.nutrition || {}

      return {
        calories: sum.calories + Number(nutrition.calories || 0),
        protein: sum.protein + Number(nutrition.protein || 0),
        carbs: sum.carbs + Number(nutrition.carbs || 0),
        fat: sum.fat + Number(nutrition.fat || 0),
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const formatValue = (value) => Math.round(value * 10) / 10

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Good things start on your plate.
          </h2>

          <p className="text-sm text-gray-500">
            Your nutrition overview at a glance.
          </p>
        </div>

        <Link
          to="/scanner"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#21633c] px-5 py-3 text-sm font-semibold text-white"
        >
          <ScanLine size={18} />
          Scan a meal
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Calories"
          value={formatValue(totals.calories).toLocaleString()}
          unit="kcal"
          note={`${todaysMeals.length} meals analyzed today`}
          icon={Flame}
        />

        <StatCard
          label="Protein"
          value={formatValue(totals.protein)}
          unit="g"
          note="Today's total"
          icon={Beef}
        />

        <StatCard
          label="Carbs"
          value={formatValue(totals.carbs)}
          unit="g"
          note="Today's total"
          icon={Wheat}
        />

        <StatCard
          label="Fats"
          value={formatValue(totals.fat)}
          unit="g"
          note="Today's total"
          icon={Droplets}
        />
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Today's meals</h3>
            <p className="text-sm text-gray-500">
              Nutrition from your analyzed food images.
            </p>
          </div>

          <Link
            to="/history"
            className="text-sm font-semibold text-[#21633c] hover:underline"
          >
            View history
          </Link>
        </div>

        {todaysMeals.length === 0 ? (
          <div className="rounded-xl bg-gray-50 px-4 py-8 text-center">
            <ScanLine className="mx-auto mb-3 text-gray-400" size={30} />

            <p className="font-medium text-gray-700">
              No meals analyzed today
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Scan your first meal to see your nutrition totals here.
            </p>

            <Link
              to="/scanner"
              className="mt-4 inline-flex rounded-lg bg-[#21633c] px-4 py-2 text-sm font-semibold text-white"
            >
              Analyze a meal
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex flex-col justify-between gap-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold capitalize text-gray-800">
                    {meal.foodName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {meal.portionGrams} g ·{' '}
                    {new Date(meal.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-[#21633c]">
                    {formatValue(Number(meal.nutrition?.calories || 0))} kcal
                  </span>
                  {' · '}
                  {formatValue(Number(meal.nutrition?.protein || 0))} g protein
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}