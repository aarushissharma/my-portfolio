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
            <Link to="/projects">drinks</Link>
            <Link to="/extras">toppings</Link>
            <Link to="/about">about the chef</Link>
            <Link to="/story">story</Link>
            <Link to="/contact" className="navbar-order">contact ↗</Link>
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