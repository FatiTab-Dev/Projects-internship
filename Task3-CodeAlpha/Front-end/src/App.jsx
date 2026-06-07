import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectBoard from './pages/ProjectBoard';
import TaskDetail from './pages/TaskDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectBoard />} /> 
            <Route path="/task/:id" element={<TaskDetail />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;