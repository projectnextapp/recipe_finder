// import React, { useState } from 'react';
// import "../styles2.css";
// import chefImage from '../images/chef.png'; 

// export default function RecipeHomePage() {
//   // State for search text and recipe results
//   const [search, setSearch] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   // Function to fetch recipes from TheMealDB
//   const fetchRecipes = async () => {
//     if (!search.trim()) return; // if empty search, do nothing
//     try {
//       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
//       const data = await response.json();
//       if (data.meals) {
//         setRecipes(data.meals);
//       } else {
//         setRecipes([]); // no results found
//       }
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   return (
//     <div className="App">
//       {/* Navbar */}
//       <nav className="navbar">
//         <h2 className="logo">SPICYCHEF RECIPE FINDER</h2>
//         <ul className="nav-links">
//           <li><a href="#home">Home</a></li>
//           <li><a href="#about">Favorite</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Learn cooking in a simple way.</h1>
//           <p>
//             Worry no more about the Right Recipe: Over 10,000+ food recipes from all around the world you can try.
//             Start cooking now!
//           </p>
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search recipes..."
//               className="search-input"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button className="search-btn" onClick={fetchRecipes}>Search</button>
//           </div>
//         </div>
//         <div className="hero-image">
//           <img src={chefImage} alt="Chef illustration" />
//         </div>
//       </section>

//       {/* Recipes Section */}
//       <section className="recipes">
//         {recipes.length > 0 ? (
//           <div className="recipe-list">
//             {recipes.map((recipe) => (
//               <div key={recipe.idMeal} className="recipe-card">
//                 <img src={recipe.strMealThumb} alt={recipe.strMeal} />
//                 <h3>{recipe.strMeal}</h3>
//                 <p>{recipe.strInstructions.substring(0, 100)}...</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p style={{ textAlign: "center" }}>No recipes found. Try searching for something!</p>
//         )}
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>© 2025 SPICYCHEF. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles2.css";
import chefImage from "../images/chef.png";
import cookingVideo from "../video/cooking.mp4";


export default function RecipeHomePage() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await response.json();
      if (data.meals) setRecipes(data.meals);
      else setError("No recipes found. Try another keyword.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyAdded = favorites.some((r) => r.idMeal === recipe.idMeal);
    if (!alreadyAdded) {
      const updated = [...favorites, recipe];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${recipe.strMeal} added to favorites!`);
    } else {
      alert("Already in favorites.");
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h2 className="logo">SPICYCHEF RECIPE FINDER</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Learn cooking in a simple way.</h1>
          <p>Worry no more about the Right Recipe: Over 10,000+ food recipes from all around the world you can try.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" onClick={fetchRecipes}>Search</button>
          </div>
        </div>
       
    
        <div className="hero-image">
          <img src={chefImage} alt="Chef illustration" />



        </div>
        
      </section>

      <section className="recipes">
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        {recipes.length > 0 && (
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="recipe-card">
                <Link to={`/recipe/${recipe.idMeal}`}>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  <h3>{recipe.strMeal}</h3>
                </Link>
                <p>{recipe.strInstructions.substring(0, 100)}...</p>
                <button onClick={() => addToFavorites(recipe)}>❤️ Add to Favorites</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>© 2025 SPICYCHEF. All rights reserved. Designed by Egwi U. Kelvin</p>
      </footer>
    </div>
  );
}
