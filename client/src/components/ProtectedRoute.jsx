import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    // Avoid a flash-redirect while we're still checking localStorage on first load
    return null
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute