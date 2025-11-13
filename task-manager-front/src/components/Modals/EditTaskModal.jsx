import React, { useState, useEffect } from 'react';
import { Type, AlignLeft, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import taskService from '../../services/taskService';

const EditTaskModal = ({ isOpen, onClose, onTaskUpdated, taskToEdit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'MEDIA',
    estado: 'PENDIENTE'
  });

  // Cada vez que abrimos el modal con una tarea nueva, actualizamos el formulario
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        titulo: taskToEdit.titulo,
        descripcion: taskToEdit.descripcion || '',
        prioridad: taskToEdit.prioridad,
        estado: taskToEdit.estado
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamamos al servicio de actualizar (PUT)
      await taskService.updateTask(taskToEdit.id, formData);
      
      toast.success("¡Tarea actualizada!");
      onTaskUpdated(); // Recargamos el grid del dashboard
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Tarea">
      <form onSubmit={handleSubmit}>
        
        {/* Título */}
        <div className="input-group">
          <Type className="input-icon" size={20} />
          <input
            type="text"
            name="titulo"
            className="input-control"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descripción */}
        <div className="input-group">
          <AlignLeft className="input-icon" size={20} style={{ top: '20px', transform: 'none' }} />
          <textarea
            name="descripcion"
            className="input-control"
            placeholder="Detalles..."
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            style={{ resize: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          
          {/* Prioridad */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <AlertCircle className="input-icon" size={20} />
            <select
              name="prioridad"
              className="input-control"
              value={formData.prioridad}
              onChange={handleChange}
            >
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          {/* Estado (Nuevo campo para edición) */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <CheckCircle2 className="input-icon" size={20} />
            <select
              name="estado"
              className="input-control"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROGRESO">En Progreso</option>
              <option value="COMPLETADA">Completada</option>
            </select>
          </div>

        </div>

        {/* Botón Guardar Cambios */}
        <button 
          type="submit" 
          className="btn btn-accent" 
          style={{ marginTop: '25px' }}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Guardar Cambios'}
        </button>

      </form>
    </Modal>
  );
};

export default EditTaskModal;