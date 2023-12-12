import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ConfigureBudget from './ConfigureBudget/ConfigureBudget';
import Expenditures from './Expenditures/Expenditures';
import Homepage from './Homepage/Homepage';
import MonthlyConsumption from './MonthlyConsumption/MonthlyConsumption';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const userData = { user: user, token: token };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        showAlertDialog();
      }, 60 * 1000); // 1 minute in milliseconds

      return () => clearInterval(intervalId);
    }
  }, [user]);

  const showAlertDialog = () => {
    const result = window.confirm('You have been inactive for 1 min, do you want to continue or sign out?');

    if (result) {
      handleRenewToken();
    } else {
      handleSignOut();
    }
  };

  const handleRenewToken = async () => {
    try {
      const response = await fetch('http://161.35.177.15:3001/renewToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-User-ID': userData.user._id,
        },
      });

      if (response.ok) {
        const { token: newToken } = await response.json();
        setToken(newToken);
      } else {
        console.error('Token renewal failed');
      }
    } catch (error) {
      console.error('Error during token renewal:', error);
    }
  };

  const handleSignIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const handleSignOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} onSignOut={handleSignOut} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn onSignIn={handleSignIn} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp onSignUp={handleSignIn} />}
        />
        <Route path="configureBudget" element={<ConfigureBudget userData={userData} />} />
        <Route path="expenditures" element={<Expenditures userData={userData} />} />
        <Route path="monthlyConsumption" element={<MonthlyConsumption userData={userData} />} />
      </Routes>
    </Router>
  );
};

export default App;
