import React from 'react';

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome to Secure App</h2>
      <p>
        This full-stack template demonstrates:
        <ul>
          <li>JWT authentication with httpOnly cookies</li>
          <li>OWASP Top-10 mitigations (XSS, CSRF, SQLi)</li>
          <li>Secure headers via Helmet</li>
          <li>Rate limiting, input validation</li>
          <li>Safe HTML rendering with DOMPurify</li>
        </ul>
      </p>
    </div>
  );
}
