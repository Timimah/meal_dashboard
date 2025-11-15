import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Details.css";

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

const MealDetailPage: React.FC = () => {
  // Get URL parameter
  const { id } = useParams<{ id: string }>();

  // For programmatic navigation
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchMeal(id);
    }
  }, [id]);

  const fetchMeal = async (mealId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/meals/${mealId}/`
      );

      if (!response.ok) {
        throw new Error("Meal not found");
      }

      const data = await response.json();
      setMeal(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!meal || !window.confirm(`Delete "${meal.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/meals/${meal.id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }

      // Navigate back to meals list
      navigate("/meals");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading meal...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!meal) return <div>Meal not found</div>;

  return (
    <div className="meal-detail-page">
      <div className="breadcrumb">
        <Link to="/meals">Back to Meals</Link>
      </div>

      <div className="meal-detail-card">
        <div className="meal-detail-header">
          <h1>{meal.name}</h1>
          <span
            className={`badge-large ${
              meal.is_available ? "available" : "unavailable"
            }`}
          >
            {meal.is_available ? "Available" : "Sold Out"}
          </span>
        </div>

        <div className="meal-detail-content">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{meal.description}</p>
          </div>

          <div className="detail-section">
            <h3>Price</h3>
            <p className="price-large">${Number(meal.price).toFixed(2)}</p>
          </div>

          <div className="detail-section">
            <h3>Details</h3>
            <dl>
              <dt>Created:</dt>
              <dd>{new Date(meal.created_at).toLocaleDateString()}</dd>

              <dt>Last Updated:</dt>
              <dd>{new Date(meal.updated_at).toLocaleDateString()}</dd>
            </dl>
          </div>
        </div>

        <div className="meal-detail-actions">
          <button
            onClick={() => navigate(`/meals/${meal.id}/edit`)}
            className="btn-primary"
          >
            Edit Meal
          </button>
          <button onClick={handleDelete} className="btn-danger">
            Delete Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
