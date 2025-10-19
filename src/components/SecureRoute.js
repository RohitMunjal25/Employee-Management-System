import React from 'react';
import { Navigate } from 'react-router-dom';
const SecureRoute = ({ children, isPrivate }) => {
  const token = localStorage.getItem('token');

  if (isPrivate) {
    
    if (!token) {
      return <Navigate to="/" replace />;
    }
  } else {

    if (token) {
      return <Navigate to="/front" replace />;
    }
  }

  return children;
}
export default SecureRoute;