import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './index.js';

export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!currentUser);
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = useCallback((userData) => {
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.clear();
    setLoggedIn(false);
    setUser(null);
  }, []);

  const providedData = useMemo(
    () => ({
      user,
      loggedIn,
      logIn,
      logOut,
    }),
    [user, loggedIn, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
