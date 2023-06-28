import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPage.jsx';
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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={getRoute.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="shadow-sm" bg="white" expand="lg" variant="light">
          <Container>
            <Navbar.Brand as={Link} to={getRoute.chatPagePath()}>Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            path={getRoute.chatPagePath()}
            element={<PrivateRoute><ChatPage /></PrivateRoute>}
          />
          <Route path={getRoute.loginPagePath()} element={<LoginPage />} />
          <Route path={getRoute.signupPagePath()} element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
