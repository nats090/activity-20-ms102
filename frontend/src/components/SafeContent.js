import React from 'react';
import DOMPurify from 'dompurify';

export default function SafeContent({ html }) {
  const clean = DOMPurify.sanitize(html);
  return (
    <div
      style={{ border: '1px solid #666', padding: '0.5rem', marginTop: '0.5rem' }}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
