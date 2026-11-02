import { saveMeal } from '../services/mealStorage'
import { analyzeFood } from '../services/api'
import { useEffect, useState } from 'react'
import {
  Upload,
  ScanLine,
  LoaderCircle,
  X,
  Flame,
  Beef,
  Wheat,
  Droplets,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'


export default function Scanner() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [portion, setPortion] = useState(100)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)

    return () => URL.revokeObjectURL(imageUrl)
  }, [file])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return

    setResult(null)
    setError('')

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Please select an image smaller than 10 MB.')
      return
    }

    setFile(selectedFile)
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a food image first.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await analyzeFood(file, Number(portion))
setResult(data)

const meal = {
  foodName: data.food_name,
  confidence: data.confidence,
  portionGrams: Number(portion),
  nutrition: data.nutrition,
  imageName: file.name,
}

saveMeal(meal)
    } catch (err) {
      const message =
  err.response?.data?.detail ||
  err.message ||
  "An unexpected error occurred.";

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const clearImage = () => {
    setFile(null)
    setResult(null)
    setError('')
  }

  const nutrition = result?.nutrition
  const hasNutrition = nutrition?.available === true

  const nutritionCards = [
    {
      label: 'Calories',
      value: nutrition?.calories,
      unit: 'kcal',
      icon: Flame,
      iconColor: 'text-orange-500',
      background: 'bg-orange-50',
    },
    {
      label: 'Protein',
      value: nutrition?.protein_g,
      unit: 'g',
      icon: Beef,
      iconColor: 'text-red-500',
      background: 'bg-red-50',
    },
    {
      label: 'Carbs',
      value: nutrition?.carbs_g,
      unit: 'g',
      icon: Wheat,
      iconColor: 'text-amber-600',
      background: 'bg-amber-50',
    },
    {
      label: 'Fat',
      value: nutrition?.fat_g,
      unit: 'g',
      icon: Droplets,
      iconColor: 'text-blue-500',
      background: 'bg-blue-50',
    },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          AI Food Scanner
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Scan a meal to identify the food and estimate its nutrition.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {!preview ? (
          <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:border-green-600 hover:bg-green-50/50">
            <div className="mb-3 rounded-full bg-green-50 p-4">
              <Upload size={30} className="text-green-700" />
            </div>

            <span className="text-sm font-semibold text-gray-800">
              Click to upload a food image
            </span>

            <span className="mt-2 text-xs text-gray-500">
              PNG, JPG or WEBP · Maximum 10 MB
            </span>

            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl bg-gray-50">
              <img
                src={preview}
                alt="Selected food"
                className="max-h-96 w-full object-contain"
              />

              <button
                type="button"
                onClick={clearImage}
                disabled={loading}
                aria-label="Remove image"
                className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-600 shadow hover:text-red-500 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label
                htmlFor="portion"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Estimated serving size (grams)
              </label>

              <div className="flex items-center gap-4">
                <input
                  id="portion"
                  type="range"
                  min="1"
                  max="1000"
                  step="1"
                  value={portion}
                  disabled={loading}
                  onChange={(event) => setPortion(event.target.value)}
                  className="w-full accent-green-700"
                />

                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={portion}
                  disabled={loading}
                  onChange={(event) => setPortion(event.target.value)}
                  className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />

                <span className="text-sm text-gray-500">g</span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                This is your estimated serving size, not a measurement
                made by the camera.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading || !portion || Number(portion) < 1 || Number(portion) > 2000}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#21633c] py-3 font-semibold text-white transition hover:bg-[#184b2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Analyzing food...
                </>
              ) : (
                <>
                  <ScanLine size={19} />
                  Analyze Image
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-green-700" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-green-800">
                  Food recognition result
                </p>

                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  {result.food_name}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Model confidence:{' '}
                  {typeof result.confidence === 'number'
                    ? `${(result.confidence * 100).toFixed(1)}%`
                    : 'Unavailable'}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Confidence is the model's score, not a guarantee of accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Nutrition Analysis
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Estimated values for {portion} g
              </p>
            </div>

            {hasNutrition ? (
              <>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {nutritionCards.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.label}
                        className="rounded-xl border border-gray-100 p-4"
                      >
                        <div
                          className={`mb-3 inline-flex rounded-lg p-2 ${item.background}`}
                        >
                          <Icon size={20} className={item.iconColor} />
                        </div>

                        <p className="text-xs text-gray-500">
                          {item.label}
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                          {item.value ?? '—'}
                          <span className="ml-1 text-xs font-normal text-gray-500">
                            {item.unit}
                          </span>
                        </p>
                      </div>
                    )
                  })}
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  These are approximate estimates from nutrition reference
                  data. Actual values vary by recipe, ingredients, and
                  preparation.
                </p>
              </>
            ) : (
              <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                Nutrition data is not available for this predicted food yet.
                The food was recognized, but its nutrition values have not
                been estimated.
              </p>
            )}
          </div>

          {result.top_predictions?.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Other model predictions
              </h3>

              <div className="space-y-4">
                {result.top_predictions.map((item, index) => (
                  <div key={`${item.food_name}-${index}`}>
                    <div className="mb-1 flex justify-between gap-3 text-sm">
                      <span className="text-gray-700">
                        {item.food_name}
                      </span>

                      <span className="font-medium text-gray-900">
                        {(item.confidence * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-green-700"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, item.confidence * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={clearImage}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <RotateCcw size={16} />
            Scan another food
          </button>
        </div>
      )}
    </div>
  )
}

