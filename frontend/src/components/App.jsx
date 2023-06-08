import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import { useAuth } from '../hooks/index.js';
import AuthProvider from '../contexts/AuthProvider.jsx';
import getRoute from '../routes.js';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('header.logout')}</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar className="shadow-sm" bg="white" expand="lg" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <AuthButton />
        </Container>
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
