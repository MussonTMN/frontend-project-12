import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import useAuth from '../hooks/index.js';
import AuthProvider from '../contexts/AuthProvider.jsx';
import getRoute from '../routes.js';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Navbar>
      <Routes>
        <Route path={getRoute.loginPagePath()} element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path={getRoute.chatPagePath()} element={(<PrivatePage />)} />
      </Routes>

    </Router>
  </AuthProvider>
);

export default App;
