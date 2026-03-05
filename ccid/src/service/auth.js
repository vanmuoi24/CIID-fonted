import axiosInstance from './../config/axios';

// Hàm đăng nhập
export const login =  (username, password) => {
    return  axiosInstance.post('/auth/login', { username,password });
}