import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeHomePage from "./pages/RecipeHomePage";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import "./styles2.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeHomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
