import React, { useEffect, useState } from 'react';
import { Trash2, Shield, User, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import userService from '../../services/userService';

const AdminUsersModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    if (isOpen) {
      cargarUsuarios();
    }
  }, [isOpen]);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (username === currentUser) {
      toast.error("No puedes eliminarte a ti mismo");
      return;
    }
    if (window.confirm(`¿Eliminar a ${username}?`)) {
      try {
        await userService.deleteUser(id);
        toast.success("Usuario eliminado");
        cargarUsuarios();
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleRoleChange = async (user) => {
    const newRole = user.rol === 'ADMIN' ? 'USER' : 'ADMIN';
    if (user.username === currentUser) {
      toast.error("No puedes cambiar tu propio rol");
      return;
    }
    try {
      await userService.updateUserRole(user.id, newRole);
      toast.success(`Rol cambiado a ${newRole}`);
      cargarUsuarios();
    } catch (error) {
      toast.error("Error al cambiar rol");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gestión de Usuarios">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin mx-auto mb-2" /> Cargando...
        </div>
      ) : (
        // Contenedor con scroll
        <div className="user-list-container">
          {users.map((user) => (
            // FILA (Flexbox)
            <div key={user.id} className="user-row">
              
              {/* IZQUIERDA: Icono + Datos */}
              <div className="user-info-group">
                {/* Icono Circular */}
                <div className="user-avatar-icon" style={{ 
                  color: user.rol === 'ADMIN' ? '#60A5FA' : '#9CA3AF',
                  background: user.rol === 'ADMIN' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                }}>
                  {user.rol === 'ADMIN' ? <Shield size={20} /> : <User size={20} />}
                </div>

                {/* Textos */}
                <div>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{user.username}</p>
                  <span className="role-badge-small">
                    {user.rol}
                  </span>
                </div>
              </div>

              {/* DERECHA: Botones */}
              <div className="user-actions-group">
                <button 
                  onClick={() => handleRoleChange(user)}
                  className="icon-btn"
                  title="Cambiar Rol"
                  style={{ color: '#FDE68A' }}
                >
                  <RefreshCw size={18} />
                </button>

                <button 
                  onClick={() => handleDelete(user.id, user.username)}
                  className="icon-btn delete"
                  title="Eliminar"
                  disabled={user.username === currentUser}
                  style={{ opacity: user.username === currentUser ? 0.3 : 1 }}
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default AdminUsersModal;