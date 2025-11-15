// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import { Link } from "react-router-dom";

interface Meal {
  id: number;
  name: string;
  price: number;
  is_available: boolean;
}

interface Stats {
  total: number;
  available: number;
  avgPrice: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    available: 0,
    avgPrice: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/meals/")
      .then((res) => res.json())
      .then((meals: Meal[]) => {
        setStats({
          total: meals.length,
          available: meals.filter((m) => m.is_available).length,
          avgPrice:
            meals.length > 0
              ? meals.reduce((sum, m) => sum + Number(m.price), 0) /
                meals.length
              : 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard Overview</h1>
      <section className="hero">
        <div className="hero-buttons">
          <Link to="/meals" className="btn-primary">
            View All Meals
          </Link>
          <Link to="/meals/new" className="btn-secondary">
            Add New Meal
          </Link>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Total Meals</h3>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>Available</h3>
          <p className="stat-value">{stats.available}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <h3>Average Price</h3>
          <p className="stat-value">${stats.avgPrice.toFixed(2)}</p>
        </div>
      </div>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📋 Meal List</h3>
            <p>Browse and manage all your meals in one place</p>
            <Link to="/meals">View Meals</Link>
          </div>
          <div className="feature-card">
            <h3>➕ Add Meals</h3>
            <p>Quickly add new meals to your menu</p>
            <Link to="/meals/new">Add Meal</Link>
          </div>
          <div className="feature-card">
            <h3>✏️ Edit & Delete</h3>
            <p>Update or remove meals as needed</p>
            <Link to="/meals">Manage</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
