import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import SignupPage from './SignupPage.jsx';
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
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="shadow-sm" bg="white" expand="lg" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route path={getRoute.chatPagePath()} element={(<PrivatePage />)} />
          <Route path={getRoute.loginPagePath()} element={<LoginPage />} />
          <Route path={getRoute.signupPagePath()} element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </AuthProvider>
);

export default App;
