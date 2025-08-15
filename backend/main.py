from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = FastAPI()

# Configure the generative AI model
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

class Ingredients(BaseModel):
    ingredients: list[str]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/generate-recipe")
async def generate_recipe(ingredients: Ingredients):
    prompt = f"Suggest a recipe using the following ingredients: {', '.join(ingredients.ingredients)}. Provide the recipe name, a short description, the ingredients list, and the instructions."
    response = model.generate_content(prompt)
    return {"recipe": response.text}
