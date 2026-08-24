import { useAuth } from '../context/AuthContext'
import './Topbar.css'

function Topbar({ title, onMenuClick }) {
  const { user } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  return (
    <header className="topbar">
      <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        ☰
      </button>

      <h1 className="topbar-title">{title}</h1>

      <div className="topbar-right">
        <div className="topbar-avatar">{initials}</div>
      </div>
    </header>
  )
}

export default Topbar