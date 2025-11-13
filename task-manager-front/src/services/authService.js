import api from './api';

const login = async (username, password) => {
  const response = await api.post('/auth/signin', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    if (response.data.rol) localStorage.setItem('rol', response.data.rol);
  }
  return response.data;
};

const register = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('rol');
  window.location.href = '/login';
};

export default {
  login,
  register,
  logout,
};