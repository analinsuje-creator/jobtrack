import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to 'light'
    return localStorage.getItem('jobtrack_theme') || 'light'
  })

  useEffect(() => {
    // Apply the theme to the whole document by setting a data attribute,
    // which our CSS variables in index.css respond to
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('jobtrack_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}