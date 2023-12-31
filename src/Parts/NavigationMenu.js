import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

const NavigationMenu = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/document/add">Add Document</Link></li>
        <li><Link to="/document/view">View</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;