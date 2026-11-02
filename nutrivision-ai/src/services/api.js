export async function analyzeFood(imageFile, portionGrams = 100) {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("portion_grams", String(portionGrams));

  const response = await fetch(
    "http://127.0.0.1:8000/api/analyze",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Food analysis failed");
  }

  return response.json();
}