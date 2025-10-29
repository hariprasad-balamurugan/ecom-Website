// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally, render a loading spinner or message here
    return <div>Loading authentication...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;