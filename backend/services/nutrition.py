# Nutrition reference values per 100 g.
# Values are approximate and intended for a prototype.
# Actual nutrition varies by recipe, ingredients, and preparation.

NUTRITION_DATABASE = {
    "pizza": {
        "calories": 266,
        "protein_g": 11.0,
        "carbs_g": 33.0,
        "fat_g": 10.0,
    },
    "hamburger": {
        "calories": 295,
        "protein_g": 17.0,
        "carbs_g": 24.0,
        "fat_g": 14.0,
    },
    "cheeseburger": {
        "calories": 303,
        "protein_g": 17.0,
        "carbs_g": 30.0,
        "fat_g": 14.0,
    },
    "apple": {
        "calories": 52,
        "protein_g": 0.3,
        "carbs_g": 13.8,
        "fat_g": 0.2,
    },
    "banana": {
        "calories": 89,
        "protein_g": 1.1,
        "carbs_g": 22.8,
        "fat_g": 0.3,
    },
    "caesar salad": {
        "calories": 127,
        "protein_g": 5.0,
        "carbs_g": 8.0,
        "fat_g": 9.0,
    },
    "samosa": {
        "calories": 262,
        "protein_g": 5.0,
        "carbs_g": 32.0,
        "fat_g": 13.0,
    },
    "idli": {
        "calories": 146,
        "protein_g": 4.5,
        "carbs_g": 30.0,
        "fat_g": 0.7,
    },
    "dosa": {
        "calories": 168,
        "protein_g": 4.0,
        "carbs_g": 29.0,
        "fat_g": 3.7,
    },
    "biryani": {
        "calories": 170,
        "protein_g": 6.0,
        "carbs_g": 22.0,
        "fat_g": 6.0,
    },
}


def estimate_nutrition(food_name: str, portion_grams: float = 100):
    """Estimate nutrition for a supported food and portion size."""

    if portion_grams <= 0 or portion_grams > 2000:
        raise ValueError("Portion must be between 1 and 2000 grams.")

    normalized_name = food_name.lower().replace("_", " ").strip()

    # Find a matching supported food.
    matched_food = next(
        (
            name
            for name in NUTRITION_DATABASE
            if name in normalized_name or normalized_name in name
        ),
        None,
    )

    if matched_food is None:
        return {
            "available": False,
            "food_name": food_name,
            "portion_grams": portion_grams,
            "message": "Nutrition data is not available for this food yet.",
        }

    reference = NUTRITION_DATABASE[matched_food]
    multiplier = portion_grams / 100

    return {
        "available": True,
        "food_name": matched_food.title(),
        "portion_grams": portion_grams,
        "reference_basis": "per 100 g",
        "estimated": True,
        "calories": round(reference["calories"] * multiplier, 1),
        "protein_g": round(reference["protein_g"] * multiplier, 1),
        "carbs_g": round(reference["carbs_g"] * multiplier, 1),
        "fat_g": round(reference["fat_g"] * multiplier, 1),
    }

