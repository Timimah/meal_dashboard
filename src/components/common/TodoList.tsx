import React, { useState } from "react";
import "./TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Props for individual TodoItem component
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void; // Function prop
  onDelete: (id: number) => void;
}

// Child component - receives props
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

// Parent component - manages state
const TodoList: React.FC = () => {
  // Complex state: array of objects
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Review meal inventory", completed: false },
    { id: 2, text: "Update prices", completed: false },
  ]);

  const [inputValue, setInputValue] = useState<string>("");

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(), // Simple unique ID
      text: inputValue,
      completed: false,
    };

    // Update state with new array (immutability!)
    setTodos([...todos, newTodo]);
    setInputValue(""); // Clear input
  };

  // Toggle completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // Create new object
          : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Derived state (computed from existing state)
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      <h2>Meal Management Tasks</h2>

      <div className="todo-stats">
        <p>
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      <div className="todo-input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          Add
        </button>
      </div>

      <div className="todo-items">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id} // Important: unique key for each list item
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;


/* 
ADVANCED STATE CONCEPTS:
========================

1. IMMUTABILITY - WHY WE DON'T DO THIS:
   ❌ todos.push(newTodo)  // Mutates array directly
   ❌ setTodos(todos)      // React won't detect change
   
   ✅ setTodos([...todos, newTodo])  // Creates NEW array
   
2. SPREAD OPERATOR (...):
   - [...todos] creates a new array copy
   - { ...todo } creates a new object copy
   - Essential for React to detect changes
   
3. ARRAY METHODS FOR STATE UPDATES:
   - Add: [...array, newItem]
   - Remove: array.filter(item => item.id !== id)
   - Update: array.map(item => item.id === id ? {...item, prop: newValue} : item)
   
4. LIFTING STATE UP:
   - State lives in parent (TodoList)
   - Functions passed as props to child (TodoItem)
   - Child calls parent functions to modify state
   - This is "unidirectional data flow"
   
5. CONTROLLED COMPONENTS:
   - Input value controlled by React state
   - value={inputValue}
   - onChange={(e) => setInputValue(e.target.value)}
   - React is "single source of truth"
   
6. LIST RENDERING:
   - todos.map() renders array of components
   - key={todo.id} required for React to track items
   - Keys must be unique and stable
   
7. DERIVED STATE:
   - completedCount calculated from todos
   - Don't store in separate state!
   - Computed on each render from existing state
*/
