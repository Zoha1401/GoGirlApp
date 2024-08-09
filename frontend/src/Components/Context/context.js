import React, { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const host = "http://localhost:5000";

  // Initialize user state
  const [user, setUser] = useState({});

  // Fetch user data function
  const fetchUser = async () => {
    try {
      const response = await fetch(`${host}/api/users/getUserbyauthtoken`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      console.log(userData)
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  const contextValue = {
    user,
    fetchUser
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
