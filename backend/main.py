from functools import lru_cache

import cv2
import numpy as np
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from transformers import pipeline

from services.nutrition import estimate_nutrition

app = FastAPI(
    title="NutriVision AI",
    description="AI-powered food recognition and nutrition estimation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MAX_IMAGE_SIZE = 10 * 1024 * 1024
MODEL_ID = "google/vit-base-patch16-224"


@lru_cache(maxsize=1)
def get_food_classifier():
    return pipeline(
        "image-classification",
        model=MODEL_ID,
        device=-1,
    )


@app.get("/")
def home():
    return {
        "message": "Welcome to NutriVision AI!",
        "status": "Backend is running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "opencv_version": cv2.__version__,
    }


@app.post("/api/analyze")
async def analyze_food(
    file: UploadFile = File(...),
    portion_grams: float = Form(100),
):
    if file.content_type not in {
        "image/jpeg",
        "image/png",
        "image/webp",
    }:
        raise HTTPException(
            status_code=400,
            detail="Upload a JPG, PNG, or WEBP image.",
        )

    if not 1 <= portion_grams <= 2000:
        raise HTTPException(
            status_code=400,
            detail="Portion must be between 1 and 2000 grams.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded image is empty.",
        )

    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image must be smaller than 10 MB.",
        )

    image_array = np.frombuffer(contents, dtype=np.uint8)
    image_bgr = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image_bgr is None:
        raise HTTPException(
            status_code=400,
            detail="Could not decode the image.",
        )

    height, width = image_bgr.shape[:2]

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)

    try:
        classifier = get_food_classifier()
        predictions = classifier(pil_image, top_k=5)
    except Exception as exc:
        print(f"Food model error: {exc}")
        raise HTTPException(
            status_code=503,
            detail="Food recognition failed. Check the backend terminal.",
        ) from exc

    top_prediction = predictions[0]
    food_name = top_prediction["label"].replace("_", " ").title()

    try:
        nutrition = estimate_nutrition(food_name, portion_grams)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    return {
        "success": True,
        "food_name": food_name,
        "confidence": round(float(top_prediction["score"]), 4),
        "top_predictions": [
            {
                "food_name": item["label"].replace("_", " ").title(),
                "confidence": round(float(item["score"]), 4),
            }
            for item in predictions
        ],
        "image": {
            "width": width,
            "height": height,
        },
        "nutrition": nutrition,
        "nutrition_note": (
            "Nutrition values are estimates based on reference data "
            "and the selected portion size."
        ),
    }

