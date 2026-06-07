import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData && userData.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

export default api;
