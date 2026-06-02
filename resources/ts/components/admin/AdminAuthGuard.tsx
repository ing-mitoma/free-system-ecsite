import React from "react";
import { Navigate } from "react-router-dom";

interface GuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: GuardProps) {
  // 💡 ブラウザの記憶からログインスタンプがあるか確認
  const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";

  // 🔒 ログインしていなければ、ログイン画面（/admin/login）へ強制転送！
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // 🔓 ログインしていれば、本来見せたかった管理画面をそのまま表示する
  return <>{children}</>;
}
