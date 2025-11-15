import React, { useState } from "react";
import "./MealCounter.css";

// Props interface - defines what data this component receives
interface MealCounterProps {
  mealName: string;
  initialQuantity?: number; 
}

const MealCounter: React.FC<MealCounterProps> = ({
  mealName,
  initialQuantity = 0, // Default value if not provided
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Event handlers
  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    // Prevent negative quantities
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const reset = () => {
    setQuantity(0);
  };

  return (
    <div className="meal-counter">
      {/* PROPS: mealName is displayed (read-only) */}
      <h3 className="meal-name">{mealName}</h3>

      {/* STATE: quantity is displayed and can be modified */}
      <div className="counter-display">
        <span className="quantity">{quantity}</span>
        <span className="label">orders</span>
      </div>

      <div className="counter-controls">
        <button onClick={decrement} disabled={quantity === 0}>
          -
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default MealCounter;
