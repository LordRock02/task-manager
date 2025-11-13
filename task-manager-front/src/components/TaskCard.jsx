import React from 'react';
import { Edit2, Trash2, Clock, CheckCircle2, Loader } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {

  const priorityStyles = {
    ALTA: {
      border: 'border-red-500/50',
      glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]', 
      bg: 'bg-red-500/10', 
      titleColor: 'text-red-100',
      fontWeight: 'font-bold'
    },
    MEDIA: {
      border: 'border-yellow-500/50',
      glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      bg: 'bg-yellow-500/10',
      titleColor: 'text-yellow-100',
      fontWeight: 'font-semibold'
    },
    BAJA: {
      border: 'border-blue-400/50',
      glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]',
      bg: 'bg-blue-500/10',
      titleColor: 'text-blue-100',
      fontWeight: 'font-normal'
    }
  };

  const statusConfig = {
    PENDIENTE: { icon: Clock, color: 'text-gray-400', bg: 'bg-gray-500/20' },
    EN_PROGRESO: { icon: Loader, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    COMPLETADA: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20' }
  };

  // Seleccionamos el estilo actual
  const style = priorityStyles[task.prioridad] || priorityStyles.BAJA;
  const status = statusConfig[task.estado] || statusConfig.PENDIENTE;
  const StatusIcon = status.icon;

  return (
    <div className={`
      relative group
      backdrop-blur-md 
      rounded-2xl p-5 
      border ${style.border} 
      ${style.bg}
      transition-all duration-300 
      hover:-translate-y-1 
      ${style.glow}
    `}>

      <div className="flex justify-between items-start mb-3">

        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color} border border-white/5`}>
          <StatusIcon size={12} className={task.estado === 'EN_PROGRESO' ? 'animate-spin-slow' : ''} />
          <span>{task.estado.replace('_', ' ')}</span>
        </div>


        <span className={`text-[10px] uppercase tracking-wider opacity-70 ${style.titleColor}`}>
          {task.prioridad}
        </span>
      </div>

      <h3 className={`text-lg mb-2 leading-tight ${style.fontWeight} ${style.titleColor}`}>
        {task.titulo}
      </h3>
      
      <p className="text-sm text-gray-300/80 line-clamp-4 mb-4 leading-relaxed">
        {task.descripcion || "Sin descripción"}
      </p>

      <div className="flex justify-end gap-2 mt-auto pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors"
          title="Editar tarea"
        >
          <Edit2 size={16} />
        </button>
        
        <button 
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
          title="Eliminar tarea"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;