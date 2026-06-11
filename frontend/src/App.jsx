import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Entrada from './pages/Entrada'
import Saida from './pages/Saida'
import Produtos from './pages/Produtos'
import Relatorios from './pages/Relatorios'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')
    
    if (token && usuarioSalvo) {
      setIsAuthenticated(true)
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  const handleLogin = (token, usuarioData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setIsAuthenticated(true)
    setUsuario(usuarioData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setIsAuthenticated(false)
    setUsuario(null)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
        />
        
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard usuario={usuario} onLogout={handleLogout} />} />
            <Route path="/entrada" element={<Entrada usuario={usuario} onLogout={handleLogout} />} />
            <Route path="/saida" element={<Saida usuario={usuario} onLogout={handleLogout} />} />
            <Route path="/produtos" element={<Produtos usuario={usuario} onLogout={handleLogout} />} />
            <Route path="/relatorios" element={<Relatorios usuario={usuario} onLogout={handleLogout} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  )
}

export default App