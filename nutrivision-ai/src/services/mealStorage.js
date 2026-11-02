const STORAGE_KEY = 'nutrivision_meals'

export function getMeals() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function saveMeal(meal) {
  const meals = getMeals()

  const newMeal = {
    ...meal,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  meals.unshift(newMeal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))

  return newMeal
}

export function deleteMeal(id) {
  const updatedMeals = getMeals().filter((meal) => meal.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals))

  return updatedMeals
}

export function clearMeals() {
  localStorage.removeItem(STORAGE_KEY)
}