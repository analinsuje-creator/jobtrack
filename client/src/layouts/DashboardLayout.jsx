import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './DashboardLayout.css'

function DashboardLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout