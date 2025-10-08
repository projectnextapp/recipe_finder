import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((r) => r.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0)
    return <p style={{ textAlign: "center" }}>No favorites yet!</p>;

  return (
    <div className="recipes">
      <h2 style={{ textAlign: "center" }}>Your Favorite Recipes</h2>
      <div className="recipe-list">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </Link>
            <button onClick={() => removeFavorite(recipe.idMeal)}>🗑 Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
