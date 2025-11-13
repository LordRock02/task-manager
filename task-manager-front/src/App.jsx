import { useState } from 'react';
import authService from './services/authService';
import taskService from './services/taskService';

function App() {
  const [resultado, setResultado] = useState('Esperando prueba...');

  const probarConexion = async () => {
    try {
      setResultado('Intentando conectar...');
      
      // 1. Intentar Login
      // ¡Asegúrate de que este usuario y contraseña EXISTAN en tu base de datos!
      const dataLogin = await authService.login("roger", "Contrasena1234*"); 
      console.log("Login Exitoso:", dataLogin);
      
      // 2. Intentar Listar Tareas (Usará el token automáticamente)
      const tareas = await taskService.getAllTasks();
      console.log("Tareas encontradas:", tareas);

      setResultado(`✅ ¡ÉXITO! Token recibido. Tareas cargadas: ${tareas.length}`);

    } catch (error) {
      console.error("Error completo:", error);
      // Si el error es de Axios, intentamos mostrar el mensaje del backend
      const mensaje = error.response?.data?.mensaje || error.message;
      setResultado(`❌ ERROR: ${mensaje}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-5">Prueba de Conexión</h1>
      
      <button 
        onClick={probarConexion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Probar Login y Tareas
      </button>

      <div className="mt-5 p-4 bg-white shadow rounded w-full max-w-md text-center">
        <p className="font-mono text-sm text-gray-700">{resultado}</p>
      </div>
    </div>
  );
}

export default App;