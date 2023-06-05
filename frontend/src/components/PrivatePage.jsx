import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

import ChatPage from './ChatPage.jsx';
import getRoutes from '../routes.js';

const PrivatePage = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? (<ChatPage />) : (
      <Navigate
        to={getRoutes.loginPagePath()}
        state={{ from: location }}
      />
    )
  );
};

export default PrivatePage;
