import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

const axiosOptions: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_ROUTE, // Base URL for all requests
  headers: { 'Content-Type': 'application/json' }, // Default header for all requests
  timeout: 120000, // 2 minutes
  timeoutErrorMessage: 'Request timed out', // Error message when request times out
  withCredentials: true, // Enable sending and receiving cookies from the server
};

const api: AxiosInstance = axios.create(axiosOptions);

// For debugging: add a 2seconds delay to all requests
// api.interceptors.request.use(config => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(config);
//     }, 1000);
//   });
// });

export default api;
