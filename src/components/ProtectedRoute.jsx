import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, route } = useAuthenticator((context) => [context.user, context.route]);
  const location = useLocation();

  if (route !== 'authenticated') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
