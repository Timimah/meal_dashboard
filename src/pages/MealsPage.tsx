import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MealsPage.css";

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number | string; // ✅ Accept both temporarily
  is_available: boolean;
}

const MealsPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeals, setFilteredMeals] = useState(meals);

  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [searchTerm, meals]);

  // Add search input in your JSX

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/meals/");

      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await response.json();

      // ✅ Normalize price to always be a number
      const normalizedMeals = data.map((meal: any) => ({
        ...meal,
        price: Number(meal.price),
      }));

      setMeals(normalizedMeals);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="meals-page">
        <div className="loading">Loading meals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="meals-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="meals-page">
      <div className="page-header">
        <h1>All Meals</h1>
        <Link to="/meals/new" className="btn-primary">
          Add New Meal
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search meals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredMeals.length === 0 ? (
        <div className="empty-state">
          <p>No meals found. Add your first meal!</p>
          <Link to="/meals/new" className="btn-primary">
            Add Meal
          </Link>
        </div>
      ) : (
        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <Link to={`/meals/${meal.id}`} key={meal.id} className="meal-card">
              <div className="meal-header">
                <h3>{meal.name}</h3>
                <span
                  className={`badge ${
                    meal.is_available ? "available" : "unavailable"
                  }`}
                >
                  {meal.is_available ? "Available" : "Sold Out"}
                </span>
              </div>
              <p className="meal-description">{meal.description}</p>
              <div className="meal-footer">
                <span className="meal-price">
                  ${Number(meal.price).toFixed(2)}
                </span>
                <span className="view-details">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsPage;
