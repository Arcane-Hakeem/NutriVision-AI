import { useEffect, useState } from 'react'
import {
  Clock,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Trash2,
  History as HistoryIcon,
  ScanLine,
  Utensils,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getMeals, deleteMeal, clearMeals } from '../services/mealStorage'

export default function History() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    setMeals(getMeals())
  }, [])

  const formatValue = (value) =>
    Number(value || 0).toLocaleString(undefined, {
      maximumFractionDigits: 1,
    })

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this meal?'
    )

    if (!confirmed) return

    const updatedMeals = deleteMeal(id)
    setMeals(updatedMeals)
  }

  const handleClearHistory = () => {
    if (meals.length === 0) return

    const confirmed = window.confirm(
      'Are you sure you want to delete all meal history? This cannot be undone.'
    )

    if (!confirmed) return

    clearMeals()
    setMeals([])
  }

  const totals = meals.reduce(
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

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#21633c]">
            <HistoryIcon size={22} />
            <span className="text-sm font-semibold">YOUR FOOD JOURNAL</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Meal History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your previously analyzed meals and nutrition.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/scanner"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#21633c] px-4 py-3 text-sm font-semibold text-white hover:bg-[#184d2d]"
          >
            <ScanLine size={18} />
            Scan a meal
          </Link>

          {meals.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 size={17} />
              Clear history
            </button>
          )}
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Meals Analyzed',
            value: meals.length,
            icon: Utensils,
          },
          {
            label: 'Total Calories',
            value: `${formatValue(totals.calories)} kcal`,
            icon: Flame,
          },
          {
            label: 'Total Protein',
            value: `${formatValue(totals.protein)} g`,
            icon: Beef,
          },
          {
            label: 'Total Carbs',
            value: `${formatValue(totals.carbs)} g`,
            icon: Wheat,
          },
        ].map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-[#21633c]">
                <Icon size={22} />
              </div>

              <p className="text-sm text-gray-500">{item.label}</p>

              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                {item.value}
              </h3>
            </div>
          )
        })}
      </section>

      {/* Meal list */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              All Analyzed Meals
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {meals.length} {meals.length === 1 ? 'record' : 'records'} saved
              on this browser.
            </p>
          </div>
        </div>

        {meals.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 px-5 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-[#21633c]">
              <Utensils size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Your meal journal is empty
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Analyze your first food image and your saved meal will appear
              here automatically.
            </p>

            <Link
              to="/scanner"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#21633c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#184d2d]"
            >
              <ScanLine size={18} />
              Analyze your first meal
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {meals.map((meal) => {
              const nutrition = meal.nutrition || {}

              return (
                <article
                  key={meal.id}
                  className="rounded-2xl border border-gray-100 p-4 transition hover:border-green-200 sm:p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#21633c]">
                        <Utensils size={22} />
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold capitalize text-gray-900">
                          {meal.foodName || 'Unknown food'}
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={13} />

                            {meal.createdAt
                              ? new Date(meal.createdAt).toLocaleString()
                              : 'Date unavailable'}
                          </span>

                          <span>{meal.portionGrams || 100} g portion</span>
                        </div>

                        {meal.imageName && (
                          <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                            Image: {meal.imageName}
                          </p>
                        )}

                        {Number.isFinite(Number(meal.confidence)) && (
                          <p className="mt-1 text-xs text-gray-500">
                            Model confidence:{' '}
                            {(Number(meal.confidence) * 100).toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(meal.id)}
                      aria-label={`Delete ${meal.foodName || 'meal'}`}
                      title="Delete meal"
                      className="self-end rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 sm:self-start"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      {
                        label: 'Calories',
                        value: formatValue(nutrition.calories),
                        unit: 'kcal',
                        icon: Flame,
                      },
                      {
                        label: 'Protein',
                        value: formatValue(nutrition.protein),
                        unit: 'g',
                        icon: Beef,
                      },
                      {
                        label: 'Carbs',
                        value: formatValue(nutrition.carbs),
                        unit: 'g',
                        icon: Wheat,
                      },
                      {
                        label: 'Fat',
                        value: formatValue(nutrition.fat),
                        unit: 'g',
                        icon: Droplets,
                      },
                    ].map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.label}
                          className="rounded-xl bg-gray-50 p-3"
                        >
                          <div className="mb-2 flex items-center gap-2 text-gray-500">
                            <Icon size={15} />
                            <span className="text-xs">{item.label}</span>
                          </div>

                          <p className="font-bold text-gray-900">
                            {item.value}
                            <span className="ml-1 text-xs font-normal text-gray-500">
                              {item.unit}
                            </span>
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}