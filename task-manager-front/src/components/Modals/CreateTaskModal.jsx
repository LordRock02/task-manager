import React, { useState } from 'react';
import { Type, AlignLeft, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import taskService from '../../services/taskService';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'MEDIA' // Valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await taskService.createTask(formData);
      toast.success("¡Tarea creada con éxito!");
      
      // Limpiar formulario
      setFormData({ titulo: '', descripcion: '', prioridad: 'MEDIA' });
      
      // Avisar al padre (Dashboard) para recargar y cerrar
      onTaskCreated();
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Error al crear la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Tarea">
      <form onSubmit={handleSubmit}>
        
        {/* Título */}
        <div className="input-group">
          <Type className="input-icon" size={20} />
          <input
            type="text"
            name="titulo"
            className="input-control"
            placeholder="Título de la tarea"
            value={formData.titulo}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        {/* Descripción */}
        <div className="input-group">
          <AlignLeft className="input-icon" size={20} style={{ top: '20px', transform: 'none' }} />
          <textarea
            name="descripcion"
            className="input-control"
            placeholder="Detalles adicionales..."
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            style={{ resize: 'none' }}
          />
        </div>

        {/* Prioridad */}
        <div className="input-group">
          <AlertCircle className="input-icon" size={20} />
          <select
            name="prioridad"
            className="input-control"
            value={formData.prioridad}
            onChange={handleChange}
          >
            <option value="BAJA">Prioridad Baja</option>
            <option value="MEDIA">Prioridad Media</option>
            <option value="ALTA">Prioridad Alta</option>
          </select>
        </div>

        {/* Botón Guardar */}
        <button 
          type="submit" 
          className="btn btn-accent" 
          style={{ marginTop: '20px' }}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Guardar Tarea'}
        </button>

      </form>
    </Modal>
  );
};

export default CreateTaskModal;