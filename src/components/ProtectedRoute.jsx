import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Authenticator />;
  }

  return children;
};

export default ProtectedRoute;
