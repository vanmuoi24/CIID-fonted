import axiosInstance from '../config/axios';

// Service tổng hợp cho tất cả API calls
const apiService = {
  // ============ USER APIs ============
  users: {
    getAll: () => axiosInstance.get('/users'),
    getById: (id) => axiosInstance.get(`/users/${id}`),
    create: (data) => axiosInstance.post('/users', data),
    update: (id, data) => axiosInstance.put(`/users/${id}`, data),
    delete: (id) => axiosInstance.delete(`/users/${id}`),
  },

  // ============ APPLICATION APIs ============
  applications: {
    getAll: () => axiosInstance.get('/applications'),
    getById: (id) => axiosInstance.get(`/applications/${id}`),
    getByUserId: (userId) => axiosInstance.get(`/applications/user/${userId}`),
    create: (data) => axiosInstance.post('/applications', data),
    update: (id, data) => axiosInstance.put(`/applications/${id}`, data),
    delete: (id) => axiosInstance.delete(`/applications/${id}`),
  },

  // ============ DOCUMENT APIs ============
  documents: {
    getAll: () => axiosInstance.get('/documents'),
    getById: (id) => axiosInstance.get(`/documents/${id}`),
    getByApplicationId: (appId) => axiosInstance.get(`/documents/application/${appId}`),
    create: (data) => axiosInstance.post('/documents', data),
    update: (id, data) => axiosInstance.put(`/documents/${id}`, data),
    delete: (id) => axiosInstance.delete(`/documents/${id}`),
    upload: (formData) => axiosInstance.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },

  // ============ LEGALIZATION STAMP APIs ============
  stamps: {
    getAll: () => axiosInstance.get('/legalization-stamps'),
    getById: (id) => axiosInstance.get(`/legalization-stamps/${id}`),
    getByDocumentId: (docId) => axiosInstance.get(`/legalization-stamps/document/${docId}`),
    create: (data) => axiosInstance.post('/legalization-stamps', data),
    update: (id, data) => axiosInstance.put(`/legalization-stamps/${id}`, data),
    delete: (id) => axiosInstance.delete(`/legalization-stamps/${id}`),
    getCodeId: (code) => axiosInstance.get(`/legalization-stamps/verify/${code}`),
  },
};

export default apiService;
