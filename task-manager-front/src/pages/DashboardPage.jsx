import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, X, Loader2, LogOut, Shield } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import taskService from '../services/taskService';
import authService from '../services/authService';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/Modals/CreateTaskModal';
import EditTaskModal from '../components/Modals/EditTaskModal';
import AdminUsersModal from '../components/Modals/AdminUserModal';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ estado: '', prioridad: '' });

  const userRole = localStorage.getItem('rol'); 
  const username = localStorage.getItem('username');

  // Estados de Modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    cargarTareas();
  }, [filters]);

  const cargarTareas = async () => {
    setLoading(true);
    try {
      const estadoParam = filters.estado || null;
      const prioridadParam = filters.prioridad || null;
      const data = await taskService.getAllTasks(estadoParam, prioridadParam);
      setTasks(data);
    } catch (error) {
      toast.error("Error cargando tareas");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout(); // Limpia localStorage
    toast.success("Sesión cerrada");
    setTimeout(() => navigate('/login'), 500);
  };


  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const clearFilters = () => setFilters({ estado: '', prioridad: '' });
  const handleEdit = (task) => { setTaskToEdit(task); setIsEditModalOpen(true); };
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
      try { await taskService.deleteTask(id); toast.success("Tarea eliminada"); cargarTareas(); } 
      catch (error) { toast.error("Error al eliminar"); }
    }
  };

  return (
    <div style={{ padding: '40px 20px' }}>
      <Toaster position="bottom-right" theme="dark" />

      <div className="dashboard-header" style={{ flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        

        <div>
          <h1 className="text-title" style={{ textAlign: 'left', fontSize: '2rem' }}>Mis Tareas</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Hola, <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{username}</span> ({userRole})
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {userRole === 'ADMIN' && (
            <button 
              className="btn" 
              style={{ 
                width: 'auto', 
                background: 'rgba(59, 130, 246, 0.2)', 
                color: '#60A5FA', 
                border: '1px solid #3B82F6' 
              }}
              onClick={() => setIsAdminModalOpen(true)}
              title="Gestion de Usuarios"
            >
              <Shield size={20} /> Admin
            </button>
          )}

          <button 
            className="btn btn-accent" 
            style={{ width: 'auto', padding: '10px 24px' }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} /> Nueva
          </button>

          {/* C. Botón Cerrar Sesión */}
          <button 
            className="btn btn-danger" 
            style={{ width: 'auto', padding: '10px 15px' }}
            onClick={handleLogout}
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 30px auto', 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center', 
        flexWrap: 'wrap' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <Filter size={18} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Filtrar:</span>
        </div>
        <select name="estado" className="input-control" style={{ width: 'auto', minWidth: '150px' }} value={filters.estado} onChange={handleFilterChange}>
          <option value="">Todos los Estados</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="EN_PROGRESO">En Progreso</option>
          <option value="COMPLETADA">Completadas</option>
        </select>
        <select name="prioridad" className="input-control" style={{ width: 'auto', minWidth: '150px' }} value={filters.prioridad} onChange={handleFilterChange}>
          <option value="">Todas las Prioridades</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Media</option>
          <option value="BAJA">Baja</option>
        </select>
        {(filters.estado || filters.prioridad) && (
          <button onClick={clearFilters} className="icon-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FCA5A5' }}>
            <X size={16} /> Limpiar
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin mx-auto mb-2" /> Cargando tareas...
        </div>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50px', border: '1px dashed rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px' }}>
          {filters.estado || filters.prioridad ? <p>No hay tareas con esos filtros 🔍</p> : <p>No tienes tareas. ¡Crea una nueva! 🚀</p>}
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
        <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onTaskCreated={cargarTareas} />
        <EditTaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onTaskUpdated={cargarTareas} taskToEdit={taskToEdit} />
        <AdminUsersModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardPage;