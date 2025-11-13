import api from './api';

const getAllUsers = async () => {
  const response = await api.get('/usuarios/listar');
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/usuarios/eliminar/${id}`);
  return response.data;
};

const updateUserRole = async (id, newRole) => {
  // Enviamos solo el rol en el body, el backend ya sabe ignorar los nulos
  const response = await api.put(`/usuarios/actualizar/${id}`, { rol: newRole });
  return response.data;
};

export default {
  getAllUsers,
  deleteUser,
  updateUserRole,
};