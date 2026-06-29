import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('clinic_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('clinic_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login:     (data) => API.post('/auth/login', data),
  getMe:     ()     => API.get('/auth/me'),
  seedUsers: ()     => API.post('/auth/seed'),
};

export const appointmentAPI = {
  getAll:   (params) => API.get('/appointments', { params }),
  create:   (data)   => API.post('/appointments', data),
  update:   (id, d)  => API.put(`/appointments/${id}`, d),
  remove:   (id)     => API.delete(`/appointments/${id}`),
  getStats: ()       => API.get('/appointments/stats'),
};

export default API;