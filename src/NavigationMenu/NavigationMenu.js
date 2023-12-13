import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function NavigationMenu() {
  return (
    <div className="menu" aria-label="Main Menu" role="navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
      <ul>
        <li>
          <Link itemProp="url" to="/">
            Homepage
          </Link>
        </li>
        <li>
          <Link itemProp="url" to="/configureBudget">
            Add Expenses
          </Link>
        </li>
        <li>
          <Link itemProp="url" to="/expenditures">
            Add Monthly Expenses
          </Link>
        </li>
        <li>
          <Link itemProp="url" to="/monthlyConsumption">
            View Monthly Expenses
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationMenu;
