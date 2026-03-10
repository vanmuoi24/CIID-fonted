import axios from 'axios';

// Tạo axios instance với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'https://ciid-backend.onrender.com/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // QUAN TRỌNG: Cho phép gửi cookies trong request
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Token được tự động gửi qua HttpOnly Cookie
    // Không cần thêm Authorization header nữa
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Trả về data trực tiếp
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 403) {
        // Token hết hạn hoặc không hợp lệ
        // Xóa user info và redirect về login
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(data.message || 'An error occurred');
    } else if (error.request) {
      return Promise.reject('No response from server');
    } else {
      return Promise.reject(error.message);
    }
  }
);

export default axiosInstance;
