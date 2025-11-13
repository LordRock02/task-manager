import api from './api';

// Listar tareas (soporta filtros opcionales)
const getAllTasks = async (estado = null, prioridad = null) => {
  let url = '/tareas/listar';
  const params = new URLSearchParams();
  
  if (estado) params.append('estado', estado);
  if (prioridad) params.append('prioridad', prioridad);
  
  if (params.toString()) url += `?${params.toString()}`;

  const response = await api.get(url);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await api.post('/tareas/crear', taskData);
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await api.put(`/tareas/actualizar/${id}`, taskData);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await api.delete(`/tareas/eliminar/${id}`);
  return response.data;
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};