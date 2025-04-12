import { useState } from 'react'
import axios from 'axios'

function ChannelList({ channels, setSelectedChannel, serverId }) {
  const [newChannelName, setNewChannelName] = useState('')

  const handleCreateChannel = async () => {
    try {
      const res = await axios.post(
        `/api/servers/${serverId}/channels`,
        { name: newChannelName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setSelectedChannel(res.data)
      setNewChannelName('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-60 bg-gray-800 p-4">
      <h3 className="text-lg mb-4">Channels</h3>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="p-2 hover:bg-gray-700 rounded cursor-pointer"
          onClick={() => setSelectedChannel(channel)}
        >
          # {channel.name}
        </div>
      ))}
      <input
        type="text"
        placeholder="New Channel"
        value={newChannelName}
        onChange={(e) => setNewChannelName(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded mt-4"
      />
      <button
        onClick={handleCreateChannel}
        className="w-full p-2 bg-blue-600 rounded mt-2"
      >
        Create
      </button>
    </div>
  )
}

export default ChannelList