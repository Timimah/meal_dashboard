// src/App.tsx - Update to use all your existing pages
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

// Your existing pages
import MealsPage from "./pages/MealsPage";
import MealDetailPage from "./pages/MealDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

// New page to add
import AddMealPage from "./pages/AddMealPage"; // You'll create this
import DashboardPage from "./pages/DashboardPage"; // Optional: stats dashboard

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      {/* <Header /> */}
      <Navigation />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/meals/new" element={<AddMealPage />} />
          <Route path="/meals/:id" element={<MealDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
