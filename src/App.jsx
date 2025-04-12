import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route
        path="/"
        element={user ? <Home user={user} /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default App