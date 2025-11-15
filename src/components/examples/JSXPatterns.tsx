import React from 'react';

interface Meal {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
}

const JSXPatterns: React.FC = () => {
  const meals: Meal[] = [
    { id: 1, name: 'Grilled Chicken', price: 15.99, isAvailable: true, category: 'Main' },
    { id: 2, name: 'Caesar Salad', price: 8.99, isAvailable: true, category: 'Appetizer' },
    { id: 3, name: 'Ribeye Steak', price: 29.99, isAvailable: false, category: 'Main' },
  ];

  const userName = 'Chef Alex';
  const isLoggedIn = true;
  
  return (
    <div className="jsx-patterns-demo">
      <h1>Advanced JSX Patterns</h1>
      
      {/* PATTERN 1: EXPRESSIONS IN JSX */}
      <section>
        <h2>1. JavaScript Expressions in JSX</h2>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <p>Total meals: {meals.length}</p>
        <p>Average price: ${(meals.reduce((sum, m) => sum + m.price, 0) / meals.length).toFixed(2)}</p>
      </section>
      
      {/* PATTERN 2: CONDITIONAL RENDERING */}
      <section>
        <h2>2. Conditional Rendering</h2>
        
        {/* Ternary operator */}
        <div>
          {isLoggedIn ? (
            <p>Welcome back, {userName}!</p>
          ) : (
            <p>Please log in</p>
          )}
        </div>
        
        {/* Logical AND (&&) */}
        <div>
          {isLoggedIn && <button>View Dashboard</button>}
        </div>
        
        {/* Null/Undefined renders nothing */}
        <div>
          {!isLoggedIn && null}
        </div>
      </section>
      
      {/* PATTERN 3: LIST RENDERING */}
      <section>
        <h2>3. Rendering Lists</h2>
        <div className="meal-list">
          {meals.map(meal => (
            <div key={meal.id} className="meal-card">
              <h3>{meal.name}</h3>
              <p>${meal.price}</p>
              
              {/* Conditional styling */}
              <span className={meal.isAvailable ? 'badge-success' : 'badge-danger'}>
                {meal.isAvailable ? 'Available' : 'Sold Out'}
              </span>
            </div>
          ))}
        </div>
      </section>
      
      {/* PATTERN 4: CONDITIONAL CLASSES */}
      <section>
        <h2>4. Dynamic Classes</h2>
        {meals.map(meal => (
          <div 
            key={meal.id}
            className={`meal-item ${meal.isAvailable ? 'available' : 'unavailable'} ${
              meal.price > 20 ? 'premium' : 'standard'
            }`}
          >
            {meal.name}
          </div>
        ))}
      </section>
      
      {/* PATTERN 5: INLINE STYLES */}
      <section>
        <h2>5. Inline Styles (Dynamic)</h2>
        {meals.map(meal => (
          <div 
            key={meal.id}
            style={{
              backgroundColor: meal.isAvailable ? '#d4edda' : '#f8d7da',
              padding: '1rem',
              margin: '0.5rem 0',
              borderRadius: '4px',
              borderLeft: `4px solid ${meal.isAvailable ? '#28a745' : '#dc3545'}`
            }}
          >
            {meal.name}
          </div>
        ))}
      </section>
      
      {/* PATTERN 6: FRAGMENTS */}
      <section>
        <h2>6. React Fragments (No Extra DOM nodes)</h2>
        
        {/* Long syntax */}
        <React.Fragment>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </React.Fragment>
        
        {/* Short syntax */}
        <>
          <p>Third paragraph</p>
          <p>Fourth paragraph</p>
        </>
      </section>
      
      {/* PATTERN 7: FILTERING AND MAPPING */}
      <section>
        <h2>7. Filter + Map Pattern</h2>
        <h3>Available Main Courses:</h3>
        <div>
          {meals
            .filter(meal => meal.isAvailable && meal.category === 'Main')
            .map(meal => (
              <div key={meal.id}>{meal.name} - ${meal.price}</div>
            ))}
        </div>
      </section>
      
      {/* PATTERN 8: HANDLING NO DATA */}
      <section>
        <h2>8. Empty State Handling</h2>
        {meals.length > 0 ? (
          <p>Showing {meals.length} meals</p>
        ) : (
          <div className="empty-state">
            <p>No meals available</p>
            <button>Add First Meal</button>
          </div>
        )}
      </section>
      
      {/* PATTERN 9: SWITCH-LIKE RENDERING */}
      <section>
        <h2>9. Multi-Condition Rendering</h2>
        {meals.map(meal => {
          let statusBadge;
          
          if (!meal.isAvailable) {
            statusBadge = <span className="badge-danger">Sold Out</span>;
          } else if (meal.price > 20) {
            statusBadge = <span className="badge-premium">Premium</span>;
          } else {
            statusBadge = <span className="badge-standard">Standard</span>;
          }
          
          return (
            <div key={meal.id}>
              {meal.name} {statusBadge}
            </div>
          );
        })}
      </section>
      
      {/* PATTERN 10: RENDER PROPS PATTERN */}
      <section>
        <h2>10. Component Composition</h2>
        <MealWrapper>
          <h3>Wrapped Content</h3>
          <p>This content is inside a wrapper component</p>
        </MealWrapper>
      </section>
    </div>
  );
};

// Component that accepts children
interface MealWrapperProps {
  children: React.ReactNode;
}

const MealWrapper: React.FC<MealWrapperProps> = ({ children }) => {
  return (
    <div style={{
      border: '2px solid #667eea',
      padding: '1rem',
      borderRadius: '8px'
    }}>
      {children}
    </div>
  );
};

export default JSXPatterns;

/*
JSX RULES AND GOTCHAS:
======================

1. SINGLE PARENT REQUIREMENT:
   ❌ return <h1>Title</h1><p>Text</p>
   ✅ return <div><h1>Title</h1><p>Text</p></div>
   ✅ return <><h1>Title</h1><p>Text</p></>

2. JAVASCRIPT EXPRESSIONS:
   ✅ {2 + 2}
   ✅ {items.length}
   ✅ {isActive ? 'Yes' : 'No'}
   ❌ {if (isActive) { return 'Yes' }}  // Can't use statements

3. RESERVED WORDS:
   ❌ class="container"      → ✅ className="container"
   ❌ for="input-id"         → ✅ htmlFor="input-id"
   
4. BOOLEAN ATTRIBUTES:
   ✅ <input disabled />
   ✅ <input disabled={true} />
   ✅ <input disabled={isDisabled} />
   
5. INLINE STYLES:
   ❌ style="color: red"
   ✅ style={{ color: 'red' }}  // Object, camelCase properties
   
6. EVENT HANDLERS:
   ❌ onclick="handleClick()"    → ✅ onClick={handleClick}
   ❌ onsubmit="handleSubmit"    → ✅ onSubmit={handleSubmit}
   
7. COMMENTS IN JSX:
   {/* This is a comment */
   
// 8. SELF-CLOSING TAGS:
//    ❌ <img src="...">           → ✅ <img src="..." />
//    ❌ <input type="text">       → ✅ <input type="text" />

// PERFORMANCE TIPS:
// =================

// 1. KEY PROP IN LISTS:
//    - Required for list items
//    - Should be stable and unique
//    - Don't use array index if items can be reordered
   
// 2. AVOID INLINE FUNCTION CREATION:
//    ❌ onClick={() => handleClick(id)}  // Creates new function each render
//    ✅ onClick={handleClick}  // Or use useCallback for complex cases
   
// 3. CONDITIONAL RENDERING:
//    - Use && for simple conditions
//    - Use ternary for if/else
//    - Extract to variable for complex conditions
// */</input>