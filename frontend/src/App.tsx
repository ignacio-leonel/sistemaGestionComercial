import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import POSPanel from './components/POSPanel';

export type UserRole = 'admin' | 'pos' | null;

export interface User {
  username: string;
  role: UserRole;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Simulación de autenticación - aquí conectarías con tu backend
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
    } else if (username === 'pos' && password === 'pos123') {
      setUser({ username, role: 'pos' });
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {user.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <POSPanel user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;