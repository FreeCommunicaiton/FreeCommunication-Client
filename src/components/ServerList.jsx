import { useState } from 'react'
import axios from 'axios'

function ServerList({ servers, setSelectedServer, user }) {
  const [newServerName, setNewServerName] = useState('')

  const handleCreateServer = async () => {
    try {
      const res = await axios.post(
        '/api/servers',
        { name: newServerName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setSelectedServer(res.data)
      setNewServerName('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center p-2">
      {servers.map((server) => (
        <div
          key={server.id}
          className="w-12 h-12 bg-gray-700 rounded-full mb-2 cursor-pointer flex items-center justify-center"
          onClick={() => setSelectedServer(server)}
        >
          {server.name[0].toUpperCase()}
        </div>
      ))}
      <input
        type="text"
        placeholder="New Server"
        value={newServerName}
        onChange={(e) => setNewServerName(e.target.value)}
        className="w-full p-1 bg-gray-700 rounded mb-2"
      />
      <button
        onClick={handleCreateServer}
        className="w-full p-1 bg-blue-600 rounded"
      >
        +
      </button>
    </div>
  )
}

export default ServerList