import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  
  // Clases dinámicas basadas en datos
  const priorityClass = `priority-${task.prioridad}`; // Ej: priority-ALTA
  const statusClass = task.estado; // Ej: PENDIENTE

  return (
    // Usamos las clases CSS del index.css
    <div className={`task-card ${priorityClass}`}>
      
      <div className="card-header">
        <span className={`badge ${statusClass}`}>
          {task.estado.replace('_', ' ')}
        </span>
        
        <span style={{ fontSize: '0.7rem', opacity: 0.7, letterSpacing: '1px' }}>
          {task.prioridad}
        </span>
      </div>

      <h3 className="card-title">
        {task.titulo}
      </h3>
      
      <p className="card-desc">
        {task.descripcion || "Sin descripción"}
      </p>

      <div className="card-actions">
        <button 
          onClick={() => onEdit(task)}
          className="icon-btn"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        
        <button 
          onClick={() => onDelete(task.id)}
          className="icon-btn delete"
          title="Eliminar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;