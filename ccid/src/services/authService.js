import axiosInstance from '../config/axios';

const authService = {
  // Đăng nhập - Token được lưu tự động trong HttpOnly Cookie
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      
      // Chỉ lưu thông tin user vào localStorage (không lưu token)
      // Token được lưu an toàn trong HttpOnly Cookie
      if (response.success && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng xuất - Xóa cookie từ server
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('user');
    } catch (error) {
      // Vẫn xóa user info ngay cả khi API call thất bại
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      if (response.success && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return !!user;
  },

  // Lấy user từ localStorage
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default authService;
