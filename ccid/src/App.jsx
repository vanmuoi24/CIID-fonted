import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Documents from './pages/Documents';
import ApplicationDetails from './pages/ApplicationDetails';
import Home from './pages/Home';
import Applications from './pages/Applications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:code" element={<Home />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
  
        <Route path="/admin/documents" element={<Documents />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/application" element={<Applications />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
