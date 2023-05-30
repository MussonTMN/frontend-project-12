import React, { useState, useCallback, useMemo } from 'react';
import AuthContext from './index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback(() => setLoggedIn(true), []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  }, []);

  const providedData = useMemo(
    () => ({
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
    }),
    [loggedIn, logIn, logOut, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
