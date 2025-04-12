import { useEffect, useState } from 'react'
import ServerList from '../components/ServerList'
import ChannelList from '../components/ChannelList'
import Chat from '../components/Chat'
import axios from 'axios'

function Home({ user }) {
  const [servers, setServers] = useState([])
  const [selectedServer, setSelectedServer] = useState(null)
  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await axios.get('/api/servers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setServers(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchServers()
  }, [])

  useEffect(() => {
    if (selectedServer) {
      const fetchChannels = async () => {
        try {
          const res = await axios.get(`/api/servers/${selectedServer.id}/channels`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          setChannels(res.data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchChannels()
    }
  }, [selectedServer])

  return (
    <div className="flex h-screen">
      <ServerList
        servers={servers}
        setSelectedServer={setSelectedServer}
        user={user}
      />
      <ChannelList
        channels={channels}
        setSelectedChannel={setSelectedChannel}
        serverId={selectedServer?.id}
      />
      {selectedChannel && (
        <Chat
          channelId={selectedChannel.id}
          user={user}
          channelName={selectedChannel.name}
        />
      )}
    </div>
  )
}

export default Home