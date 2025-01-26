import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users to login or register pages
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users based on their roles
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} replace />;
  }

  // Prevent non-admin users from accessing admin pages
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/shop/home" replace />;
  }

  // Prevent admins from accessing shop pages
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Render children if no conditions match
  return <>{children}</>;
};

export default CheckAuth;
