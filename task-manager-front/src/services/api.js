import axios from 'axios';

// 1. Crear la instancia de Axios con la URL base de tu Backend
const api = axios.create({
  baseURL: 'http://localhost:8080', // Asegúrate que este sea el puerto de tu Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Peticiones (Request Interceptor)
// Antes de enviar cualquier petición, revisamos si hay un token guardado
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Buscamos el token en el navegador
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Lo pegamos en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;