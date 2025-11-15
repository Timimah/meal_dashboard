import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Meal Dashboard</h1>
        <p className="header-subtitle">Manage your restaurant meals</p>
      </div>
    </header>
  );
};

export default Header;

