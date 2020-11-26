import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

export default () => (
  <div className="header">
    <ul className="nav-container">
      <li className="nav-item">
        <NavLink to="/form">
          Форма
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/second-page">
          Страшно
        </NavLink>
      </li>
    </ul>
  </div>
);
