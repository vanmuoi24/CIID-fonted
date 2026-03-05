import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Component bảo vệ routes - Chỉ cho phép user đã đăng nhập truy cập
 * Sử dụng: <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  // Nếu chưa đăng nhập, redirect về login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu yêu cầu role cụ thể và user không có role đó
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Cho phép truy cập
  return children;
}

export default ProtectedRoute;
