import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          Job<span>Track</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>

          <div className="navbar-actions-mobile">
            <Link to="/login" className="btn btn-text" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </div>
        </nav>

        <div className="navbar-actions-desktop">
          <Link to="/login" className="btn btn-text">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar