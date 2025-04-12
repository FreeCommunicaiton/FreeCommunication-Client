import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          No account?{' '}
          <a href="/register" className="text-blue-400">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login