import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Request interceptor:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response interceptor:', response);
    return response;
  },
  (error) => {
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default instance;
