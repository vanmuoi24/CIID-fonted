# Hướng dẫn sử dụng API với JWT Authentication (HttpOnly Cookies)

## 🔐 Bảo mật Token với HttpOnly Cookies

Dự án này sử dụng **HttpOnly Cookies** để lưu trữ JWT token - đây là phương pháp an toàn nhất vì:
- ✅ Token không thể bị truy cập từ JavaScript (chống XSS attacks)
- ✅ Token tự động được gửi kèm mọi request
- ✅ Không cần quản lý token thủ công trong code
- ✅ Bảo vệ khỏi các cuộc tấn công CSRF khi kết hợp với SameSite cookie

## 📁 Cấu trúc Files

```
fontend/ccid/src/
├── config/
│   └── axios.js              # Cấu hình axios với withCredentials
├── services/
│   ├── authService.js        # Service xử lý authentication
│   └── apiService.js         # Service cho các API calls khác
```

## 🚀 Cách sử dụng

### 1. Import Services

```javascript
import authService from './services/authService';
import apiService from './services/apiService';
```

### 2. Authentication

#### Đăng nhập
```javascript
try {
  const response = await authService.login('username', 'password');
  console.log('Login successful:', response.data.user);
  // Token được lưu tự động trong HttpOnly Cookie
  // User info được lưu trong localStorage
} catch (error) {
  console.error('Login failed:', error);
}
```

#### Đăng ký
```javascript
try {
  const userData = {
    username: 'newuser',
    password: 'password123',
    fullName: 'Nguyễn Văn A',
    role: 'USER'
  };
  const response = await authService.register(userData);
  console.log('Registration successful:', response);
} catch (error) {
  console.error('Registration failed:', error);
}
```

#### Đăng xuất
```javascript
try {
  await authService.logout();
  // Cookie được xóa từ server
  // User info được xóa khỏi localStorage
  window.location.href = '/login';
} catch (error) {
  console.error('Logout failed:', error);
}
```

#### Kiểm tra trạng thái đăng nhập
```javascript
const isLoggedIn = authService.isAuthenticated();
const currentUser = authService.getUser();
```

### 3. API Calls

#### Users
```javascript
// Lấy tất cả users
const users = await apiService.users.getAll();

// Lấy user theo ID
const user = await apiService.users.getById(1);

// Tạo user mới
const newUser = await apiService.users.create({
  username: 'user1',
  password: 'pass123',
  fullName: 'User One',
  role: 'USER'
});

// Cập nhật user
const updated = await apiService.users.update(1, { fullName: 'New Name' });

// Xóa user
await apiService.users.delete(1);
```

#### Applications
```javascript
// Lấy tất cả applications
const apps = await apiService.applications.getAll();

// Lấy applications của user
const userApps = await apiService.applications.getByUserId(userId);

// Tạo application mới
const newApp = await apiService.applications.create({
  userId: 1,
  applicationType: 'PASSPORT',
  status: 'PENDING'
});
```

#### Documents
```javascript
// Upload document
const formData = new FormData();
formData.append('file', file);
formData.append('applicationId', applicationId);
const uploaded = await apiService.documents.upload(formData);

// Lấy documents của application
const docs = await apiService.documents.getByApplicationId(appId);
```

#### Legalization Stamps
```javascript
// Lấy tất cả stamps
const stamps = await apiService.stamps.getAll();

// Tạo stamp mới
const newStamp = await apiService.stamps.create({
  documentId: 1,
  stampNumber: 'STAMP001',
  issueDate: '2024-01-01'
});
```

## 🔧 Cấu hình

### Backend URL
Mặc định: `http://localhost:8080/api`

Để thay đổi, sửa file `src/config/axios.js`:
```javascript
baseURL: 'http://your-backend-url/api'
```

### Timeout
Mặc định: 10 giây

Để thay đổi:
```javascript
timeout: 30000 // 30 giây
```

## ⚠️ Lưu ý quan trọng

### 1. withCredentials
File `axios.js` đã được cấu hình với `withCredentials: true`. **KHÔNG XÓA** dòng này vì nó cần thiết để gửi cookies.

### 2. CORS
Backend đã được cấu hình để:
- Cho phép origins: `http://localhost:5173` và `http://localhost:3000`
- Cho phép credentials (cookies)
- Expose header `Set-Cookie`

### 3. Production
Khi deploy lên production:
1. Thay đổi `baseURL` trong `axios.js`
2. Cập nhật `allowedOrigins` trong backend `SecurityConfig.java`
3. Set `jwtCookie.setSecure(true)` trong `AuthController.java` để chỉ gửi cookie qua HTTPS

### 4. Token Storage
- ❌ **KHÔNG** lưu token trong localStorage
- ❌ **KHÔNG** lưu token trong sessionStorage
- ✅ Token được lưu tự động trong HttpOnly Cookie
- ✅ Chỉ lưu user info (không có sensitive data) trong localStorage

## 🐛 Xử lý lỗi

Axios interceptor tự động xử lý:
- **401 Unauthorized**: Tự động redirect về `/login`
- **Network errors**: Trả về message "No response from server"
- **Other errors**: Trả về error message từ server

```javascript
try {
  const data = await apiService.users.getAll();
} catch (error) {
  // error là string message, không phải error object
  console.error(error); // "Invalid username or password"
}
```

## 📝 Example: Login Component

```javascript
import { useState } from 'react';
import authService from '../services/authService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      console.log('Logged in:', response.data.user);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Users
- `GET /api/users` - Lấy tất cả users
- `GET /api/users/:id` - Lấy user theo ID
- `POST /api/users` - Tạo user mới
- `PUT /api/users/:id` - Cập nhật user
- `DELETE /api/users/:id` - Xóa user

### Applications
- `GET /api/applications` - Lấy tất cả applications
- `GET /api/applications/:id` - Lấy application theo ID
- `GET /api/applications/user/:userId` - Lấy applications của user
- `POST /api/applications` - Tạo application mới
- `PUT /api/applications/:id` - Cập nhật application
- `DELETE /api/applications/:id` - Xóa application

### Documents
- `GET /api/documents` - Lấy tất cả documents
- `GET /api/documents/:id` - Lấy document theo ID
- `GET /api/documents/application/:appId` - Lấy documents của application
- `POST /api/documents` - Tạo document mới
- `POST /api/documents/upload` - Upload file
- `PUT /api/documents/:id` - Cập nhật document
- `DELETE /api/documents/:id` - Xóa document

### Legalization Stamps
- `GET /api/legalization-stamps` - Lấy tất cả stamps
- `GET /api/legalization-stamps/:id` - Lấy stamp theo ID
- `GET /api/legalization-stamps/document/:docId` - Lấy stamps của document
- `POST /api/legalization-stamps` - Tạo stamp mới
- `PUT /api/legalization-stamps/:id` - Cập nhật stamp
- `DELETE /api/legalization-stamps/:id` - Xóa stamp

## 🎯 Best Practices

1. **Luôn sử dụng try-catch** khi gọi API
2. **Kiểm tra authentication** trước khi render protected routes
3. **Xử lý loading states** khi đang fetch data
4. **Hiển thị error messages** cho user
5. **Không log sensitive data** trong production

---

**Tạo bởi:** CCID Development Team  
**Ngày cập nhật:** 27/02/2026
