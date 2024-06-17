import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

const mapStatetoProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStatetoProps)(ProtectedRoute);
