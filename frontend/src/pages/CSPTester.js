import React, { useState } from 'react';

export default function CSPTester() {
  const [url, setUrl] = useState('');

  // Tries to load an external script
  const loadExternal = () => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = () => console.log('External script loaded:', url);
    s.onerror = () => console.log('External script failed to load (likely CSP).');
    document.head.appendChild(s);
  };

  // Inserts an inline script
  const insertInline = () => {
    const s = document.createElement('script');
    s.textContent = `console.log('Inline script ran—if CSP allows it.');`;
    document.head.appendChild(s);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>CSP Violation Tester</h2>

      <div>
        <input
          type="text"
          placeholder="https://evil.com/evil.js"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{ width: '60%' }}
        />
        <button onClick={loadExternal} style={{ marginLeft: '1rem' }}>
          Load External Script
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={insertInline}>
          Insert Inline Script
        </button>
      </div>

      <p style={{ marginTop: '1rem' }}>
        After clicking, check:
        <ul>
          <li>Your browser console for “Refused to load…” errors</li>
          <li>Your backend terminal for the CSP Violation JSON report</li>
        </ul>
      </p>
    </div>
  );
}
