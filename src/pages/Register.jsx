import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register({ setUser }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      })
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />
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
            Register
          </button>
        </form>
        <p className="mt-4">
          Have an account?{' '}
          <a href="/login" className="text-blue-400">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register