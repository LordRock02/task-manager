import api from './api';

const login = async (username, password) => {
  const response = await api.post('/auth/signin', { username, password });
  // Si el login es exitoso, guardamos el token en el navegador
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    // Si guardaste el rol en el back, guárdalo aquí también
    if (response.data.rol) localStorage.setItem('rol', response.data.rol);
  }
  return response.data;
};

const register = async (userData) => {
  // userData debe ser { username, password, rol (opcional) }
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('rol');
  window.location.href = '/login'; // Redirigir al login
};

export default {
  login,
  register,
  logout,
};