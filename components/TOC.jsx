import React, { useEffect, useState } from 'react';

export default function TOC({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split('\n');
    const extractedHeadings = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        extractedHeadings.push({
          level,
          text,
          id,
        });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents no-print">
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
