import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';

const ExpensesForm = ({ userData }) => {
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]);
  const [yearOptions, setYearOptions] = useState([]);
  const [formData, setFormData] = useState({
    expenses: '',
    amount: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    // Fetch description options from the database
    axios.get('http://161.35.177.15:3001/expenses', {
      headers: {
        'X-User-ID': userData.user._id,
      },
    })
    .then((response) => {
      // Assuming the response.data is an array of objects with 'description' field
      setDescriptionOptions(response.data.map(option => ({
        label: option.description,
        value: option._id,
      })));
    })
    .catch((error) => {
      console.error('Error fetching description options:', error);
    });

    // Generate year options dynamically (e.g., from the current year to the next 10 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
    setYearOptions(years);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, token } = userData;

      let d = formData.month + ' 1, ' + formData.year;
      let date = new Date(d);

      if (!token) {
        console.error('No token available');
        return;
      }

      // Call your backend API to create new expenses
      const response = await fetch('http://161.35.177.15:3001/Expenditures', {
        method: 'POST',
        body: JSON.stringify({ expenses: formData.expenses, amount: formData.amount, date, user }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      console.log(response);

      if (response.ok) {
        const newExpenses = await response.json();
        console.log(newExpenses); // Update the user state or perform any necessary actions
      } else {
        // Handle server-side error
        const errorData = await response.json();
        console.error(errorData.error);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error creating new expenses:', error);
      // Handle other errors (e.g., network issues)
    }
  };

  return (
    <div>
      <Menu />
      <div className="SignInContainer">
        <h2>Expenses Form</h2>
        <form className="SignInForm" onSubmit={handleSubmit}>
          <label>
            Description:
            <select name="expenses" value={formData.expenses} onChange={handleChange}>
              <option value="">Select Description</option>
              {descriptionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Month:
            <select name="month" value={formData.month} onChange={handleChange}>
              <option value="">Select Month</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Year:
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExpensesForm;
