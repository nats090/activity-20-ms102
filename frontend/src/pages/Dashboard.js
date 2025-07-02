import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import SafeContent from '../components/SafeContent';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [rawHtml, setRawHtml] = useState('');

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data))
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load users');
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>User List</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>

      <hr />

      <h3>Safe HTML Preview</h3>
      <textarea
        style={{ width: '100%', height: '100px' }}
        placeholder="Enter some HTML..."
        value={rawHtml}
        onChange={e => setRawHtml(e.target.value)}
      />
      <SafeContent html={rawHtml} />
    </div>
  );
}
