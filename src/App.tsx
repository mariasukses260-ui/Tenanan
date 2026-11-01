import { useState } from 'react';
import LoginGate from './LoginGate';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>Sidang Sengketa Tegal Soka</h1>
        <p style={{ marginTop: 12, opacity: 0.8 }}>Aplikasi siap berjalan.</p>
      </div>
    </div>
  );
}
