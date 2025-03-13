import React, { useState, useEffect } from 'react';
import './App.css';
import elements from './elements';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const closePopup = () => {
    setSelectedElement(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredElements = elements.filter(
    (element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.number.toString().includes(searchQuery)
  );

  const renderElements = () => {
    return filteredElements.map((element) => (
      <div
        key={element.symbol}
        className={`element-card ${element.category.toLowerCase()} position-${element.number}`}
        onClick={() => handleElementClick(element)}
      >
        <div className="element-info">
          <p className="atomic-number">{element.number}</p>
          <p className="symbol">{element.symbol}</p>
          <p className="name">{element.name}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
<nav className="navbar">
  <div className="logo-container">
    <img src="/logo.png" alt="Logo" className="logo-img" />
    <h1 className="logo">Atom Insight</h1>
  </div>
  <input
    type="text"
    className="search-bar"
    placeholder="Search elements..."
    value={searchQuery}
    onChange={handleSearchChange}
  />
  <div className="navbar-right">
    <button className="theme-toggle github-button" onClick={toggleTheme}>
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
    <a
      href="https://github.com/skipper-108/Periodic-table.git"
      className="github-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/github-mark-white.png" alt="GitHub" className="github-icon" />
      GitHub
    </a>
  </div>
</nav>


      <main className="main-content">
        <section className={`elements-container ${isMobile ? 'mobile' : ''}`}>
          {renderElements()}
        </section>

        {selectedElement && (
          <div className="popup" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={closePopup}>✕</button>
              <h2>{selectedElement.name}</h2>
              <p className="symbol">{selectedElement.symbol}</p>
              <p>Atomic Number: {selectedElement.number}</p>
              <p>Atomic Mass: {selectedElement.atomic_mass.toFixed(4)}</p>
              <p>{selectedElement.summary}</p>
              {/* <a
                href={`https://en.wikipedia.org/wiki/${selectedElement.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wiki-link"
              >
                Learn more
              </a> */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;