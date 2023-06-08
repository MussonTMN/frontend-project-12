import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = useCallback((userData) => {
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    logOut();
    return {};
  }, [logOut]);

  const providedData = useMemo(
    () => ({
      user,
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
    }),
    [user, loggedIn, logIn, logOut, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
