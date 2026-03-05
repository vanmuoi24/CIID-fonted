# Ví dụ sử dụng Login và ProtectedRoute

## 1. Cấu hình Routes trong App.jsx

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - Cần đăng nhập */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes - Chỉ ADMIN */}
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root dựa vào authentication */}
        <Route 
          path="/" 
          element={
            authService.isAuthenticated() 
              ? <Navigate to="/dashboard" replace /> 
              : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 2. Thêm Logout button trong Layout

```javascript
import { Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Header() {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      message.success('Đăng xuất thành công!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn redirect về login ngay cả khi có lỗi
      navigate('/login');
    }
  };

  return (
    <div className="header">
      <div>Xin chào, {user?.fullName || user?.username}</div>
      <Button 
        icon={<LogoutOutlined />} 
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </div>
  );
}
```

## 3. Sử dụng API trong Components

### Lấy danh sách users
```javascript
import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import apiService from '../services/apiService';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.users.getAll();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      message.error('Không thể tải danh sách users: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table 
      dataSource={users} 
      loading={loading}
      rowKey="id"
    />
  );
}
```

### Tạo user mới
```javascript
const handleCreateUser = async (values) => {
  try {
    const response = await apiService.users.create(values);
    if (response.success) {
      message.success('Tạo user thành công!');
      fetchUsers(); // Refresh list
    }
  } catch (error) {
    message.error('Tạo user thất bại: ' + error);
  }
};
```

### Upload file
```javascript
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('applicationId', applicationId);

  try {
    const response = await apiService.documents.upload(formData);
    if (response.success) {
      message.success('Upload thành công!');
    }
  } catch (error) {
    message.error('Upload thất bại: ' + error);
  }
};
```

## 4. Kiểm tra authentication trong component

```javascript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function SomeComponent() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Kiểm tra nếu chưa login
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Kiểm tra role
    if (user.role !== 'ADMIN') {
      navigate('/unauthorized');
      return;
    }
  }, []);

  return <div>Protected content</div>;
}
```

## 5. Refresh user info

```javascript
const refreshUserInfo = async () => {
  try {
    const response = await authService.getCurrentUser();
    if (response.success) {
      console.log('Updated user info:', response.data);
    }
  } catch (error) {
    console.error('Failed to refresh user info:', error);
  }
};
```

## 6. Test với Postman hoặc curl

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}' \
  -c cookies.txt
```

### Gọi API với cookie
```bash
curl -X GET http://localhost:8080/api/users \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -b cookies.txt
```

## 7. Debug trong Browser

### Xem cookie
1. Mở DevTools (F12)
2. Application tab > Cookies
3. Tìm cookie tên "jwt"
4. Kiểm tra:
   - HttpOnly: ✅ (phải có)
   - Secure: ❌ (trong dev), ✅ (trong production)
   - SameSite: Lax hoặc Strict

### Xem network requests
1. Network tab
2. Gọi API login
3. Kiểm tra Response Headers có "Set-Cookie"
4. Các request tiếp theo tự động gửi cookie

## 8. Lưu ý quan trọng

### ✅ Nên làm:
- Luôn dùng try-catch khi gọi API
- Hiển thị loading state
- Xử lý errors và hiển thị cho user
- Kiểm tra authentication trước khi render protected content
- Log errors để debug (nhưng không log sensitive data)

### ❌ Không nên:
- Lưu token trong localStorage/sessionStorage
- Truy cập cookie từ JavaScript
- Hardcode credentials trong code
- Bỏ qua error handling
- Log password hoặc token

## 9. Troubleshooting

### Lỗi: "No response from server"
- Kiểm tra backend có đang chạy không
- Kiểm tra URL trong axios config
- Kiểm tra CORS configuration

### Lỗi: "401 Unauthorized"
- Token hết hạn hoặc không hợp lệ
- Kiểm tra cookie có được gửi không
- Kiểm tra withCredentials: true trong axios

### Cookie không được set
- Kiểm tra CORS allowCredentials
- Kiểm tra domain/path của cookie
- Kiểm tra SameSite policy

---

**Cập nhật:** 27/02/2026
