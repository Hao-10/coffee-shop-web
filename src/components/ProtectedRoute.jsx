import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // 等待 Firebase 初始化驗證狀態
  if (loading) {
    return <div>載入中...</div>; // 你可以改為 spinner 元件
  }

  // 若未登入，導向登入頁面
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 若已登入，顯示子元素
  return children;
}