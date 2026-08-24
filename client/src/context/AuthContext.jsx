import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('jobtrack_token') || null)
  const [loading, setLoading] = useState(true)

  // On first load, check if we already have saved login info from a previous session
  useEffect(() => {
    const savedUser = localStorage.getItem('jobtrack_user')
    const savedToken = localStorage.getItem('jobtrack_token')

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
    }

    setLoading(false)
  }, [])

  const login = (userData) => {
    // userData comes from the backend and includes { _id, name, email, token }
    const { token: newToken, ...userInfo } = userData

    setUser(userInfo)
    setToken(newToken)

    localStorage.setItem('jobtrack_user', JSON.stringify(userInfo))
    localStorage.setItem('jobtrack_token', newToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('jobtrack_user')
    localStorage.removeItem('jobtrack_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook so components can just call useAuth() instead of importing useContext + AuthContext every time
export function useAuth() {
  return useContext(AuthContext)
}