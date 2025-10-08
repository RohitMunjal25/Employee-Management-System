import axios from 'axios';

const api = axios.create({
  
  baseURL: 'https://backend-employee-management-system-rleq.onrender.com', 
  
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;