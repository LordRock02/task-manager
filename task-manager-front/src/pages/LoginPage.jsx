import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Loader2 } from 'lucide-react'; 
import toast, { Toaster } from 'react-hot-toast';
import authService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData.username, formData.password);
      toast.success(`¡Bienvenido!`);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || "Credenciales incorrectas";
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-center">
      <Toaster position="top-center" />

      <div className="glass-card" style={{ maxWidth: '400px' }}>
        
        <h1 className="text-title">Login</h1>
        <p className="text-subtitle">Bienvenido a tu gestor de tareas</p>

        <form onSubmit={handleSubmit}>
          

          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              name="username"
              className="input-control"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              name="password"
              className="input-control"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="link">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;