import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles2.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setRecipe(data.meals[0]);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p style={{ textAlign: "center" }}>Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      <Link to="/" style={{ marginLeft: 20 }}>⬅ Back</Link>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
        })}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
      {/* {recipe.strSource && <a href={recipe.strSource} target="_blank" rel="noreferrer">View Full Recipe</a>} */}
    </div>
  );
}
