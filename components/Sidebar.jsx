import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar({ coverPage, entries }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after clicking
      if (window.innerWidth < 1024) {
        setIsMobileOpen(false);
      }
    }
  };

  return (
    <>
      <button 
        className="sidebar-toggle-mobile no-print" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar no-print ${isMobileOpen ? 'mobile-open' : ''}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Navigation</h3>
            
            {coverPage && (
              <button 
                onClick={() => scrollToSection('cover-page')}
                className="sidebar-link"
              >
                <span className="sidebar-icon">📋</span>
                Cover Page
              </button>
            )}

            <div className="sidebar-divider"></div>
            
            <h4 className="sidebar-subtitle">Entries</h4>
            {entries.map((entry, index) => (
              <button
                key={entry.slug}
                onClick={() => scrollToSection(entry.slug)}
                className="sidebar-link"
              >
                <span className="sidebar-icon">📄</span>
                <div className="sidebar-entry-info">
                  <span className="sidebar-entry-title">{entry.title}</span>
                  <span className="sidebar-entry-date">{entry.date}</span>
                </div>
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
