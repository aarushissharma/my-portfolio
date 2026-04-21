import '../styles/Navbar.css'

import { Link } from 'react-router-dom'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-dot" />
            aarushi's code café
          </Link>
          <div className="navbar-links">
            <Link to="/">menu</Link>
            <Link to="/projects">specials</Link>
            <Link to="/about">about</Link>
            <Link to="/extras">extras</Link>
            <Link to="/story">story</Link>
            <Link to="/resume">résumé</Link>
            <Link to="/contact" className="navbar-order">order ↗</Link>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar