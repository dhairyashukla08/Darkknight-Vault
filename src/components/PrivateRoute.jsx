import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import DarkknightLoader from './DarkknightLoader';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  
  if (loading) {
    return <DarkknightLoader />;
  }
  
  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;