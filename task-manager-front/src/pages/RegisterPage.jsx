import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Loader2, UserPlus } from 'lucide-react'; 
import toast, { Toaster } from 'react-hot-toast';
import authService from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(formData);
      toast.success('¡Registro exitoso! Ahora inicia sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error.response?.data && typeof error.response.data === 'object') {
        const data = error.response.data;
        if (data.mensaje) {
          toast.error(data.mensaje);
        } else {
          const primerError = Object.values(data)[0];
          toast.error(primerError || "Error al registrarse");
        }
      } else {
        toast.error("Error al conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-center">
      <Toaster position="top-center" />

      <div className="glass-card" style={{ maxWidth: '400px' }}>
        
        <h1 className="text-title">Registro</h1>
        <p className="text-subtitle">Crea tu cuenta para empezar</p>

        <form onSubmit={handleSubmit}>
          
          {/* Input Usuario */}
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              name="username"
              className="input-control"
              placeholder="Elige un usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>


          <div className="input-group" style={{ marginBottom: '0.5rem' }}>
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              name="password"
              className="input-control"
              placeholder="Contraseña segura"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem', marginLeft: '4px' }}>
            Mínimo 8 caracteres, mayúscula, número y símbolo.
          </p>

          {/* Botón de Registro */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Creando...
              </>
            ) : (
              <>
                <UserPlus size={20} /> Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="link">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;