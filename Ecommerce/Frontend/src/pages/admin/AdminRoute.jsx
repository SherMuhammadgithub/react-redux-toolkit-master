import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  ); // Redirect to login page if user is not logged in or not an admin
}
