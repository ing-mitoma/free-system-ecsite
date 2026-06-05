import React from "react";
import { Navigate } from "react-router-dom";

interface GuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: GuardProps) {
  const isLoggedIn =
    localStorage.getItem("admin_logged_in") === "true" || "false";

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
