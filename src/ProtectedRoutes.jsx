import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router";

function ProtectedRoutes({ children }) {
  const { user, loading } = useContext(AuthContext);

  console.log({ user, loading });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
