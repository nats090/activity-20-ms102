import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .catch(console.error)
      .finally(() => {
        setUser(null);
        navigate('/login', { replace: true });
      });
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>

      {user ? (
        <>
          <span style={{ marginRight: '1rem' }}>
            Hello, {user.email}
          </span>
          <Link to="/dashboard" style={{ marginRight: '1rem' }}>
            Dashboard
          </Link>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>
            Login
          </Link>
          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
