import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext({
  isAuthenticated: false,
  username: null,
  password: null, 
  login: (username, password) => { },
  logout: () => { },
});

const IS_AUTHENTICATED_STORAGE_KEY = 'isAuthenticated';
const USERNAME_STORAGE_KEY = 'username';
const PASSWORD_STORAGE_KEY = 'password'; 

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedIsAuthenticated = localStorage.getItem(IS_AUTHENTICATED_STORAGE_KEY);
    const storedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    const storedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY); 

    if (storedIsAuthenticated === 'true' && storedUsername && storedPassword) { 
      console.log("AuthProvider: Initialized state from localStorage (Authenticated)");
      return {
        isAuthenticated: true,
        username: storedUsername,
        password: storedPassword, 
      };
    }

    console.log("AuthProvider: Initialized with default state (Not Authenticated)");
    return {
      isAuthenticated: false,
      username: null,
      password: null,
    };
  });

  useEffect(() => {
    console.log("AuthProvider useEffect: auth state changed, syncing to localStorage", auth);
    if (auth && auth.isAuthenticated && auth.username && auth.password) { 
      localStorage.setItem(IS_AUTHENTICATED_STORAGE_KEY, 'true');
      localStorage.setItem(USERNAME_STORAGE_KEY, auth.username);
      localStorage.setItem(PASSWORD_STORAGE_KEY, auth.password); 
    } else {
      localStorage.removeItem(IS_AUTHENTICATED_STORAGE_KEY);
      localStorage.removeItem(USERNAME_STORAGE_KEY);
      localStorage.removeItem(PASSWORD_STORAGE_KEY); 
    }
  }, [auth]);

  const login = (username, password) => {
  
    const newState = {
      isAuthenticated: true,
      username: username,
      password: password, 
    };
    setAuth(newState);
    console.log("AuthContext: Login successful, state updated", newState);
  };

  const logout = () => {
    const newState = {
      isAuthenticated: false,
      username: null,
      password: null,
    };
    setAuth(newState);
    console.log("AuthContext: State updated on logout", newState);
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};