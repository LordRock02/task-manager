import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        

        <Route path="/register" element={<RegisterPage />} /> 
        
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;