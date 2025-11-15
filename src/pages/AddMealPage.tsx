// src/pages/AddMealPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MealForm from "../components/forms/MealForm";
import "./Details.css";

const AddMealPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="add-meal-page">
      <h1>Add New Meal</h1>
      <MealForm
        onSuccess={() => {
          navigate("/meals"); // Navigate to meals list after success
        }}
        onCancel={() => {
          navigate("/meals"); // Navigate back on cancel
        }}
      />
    </div>
  );
};

export default AddMealPage;
