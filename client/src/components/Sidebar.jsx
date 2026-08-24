import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth()

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/applications', label: 'Applications', icon: '📋' },
    { to: '/interviews', label: 'Interviews', icon: '🗓️' },
    { to: '/analytics', label: 'Analytics', icon: '📈' },
    { to: '/profile', label: 'Profile', icon: '👤' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          Job<span>Track</span>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          <span className="sidebar-icon">🚪</span>
          Logout
        </button>
      </aside>
    </>
  )
}

export default Sidebar