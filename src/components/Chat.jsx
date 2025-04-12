import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function Chat({ channelId, user, channelName }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const ws = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/api/ws/${channelId}`)
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prev) => [...prev, message])
    }

    return () => {
      ws.current.close()
    }
  }, [channelId])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/channels/${channelId}/messages`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setMessages(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMessages()
  }, [channelId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        content: newMessage,
        userId: user.id,
        channelId,
      }
      ws.current.send(JSON.stringify(message))
      setNewMessage('')
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="p-4 text-xl border-b border-gray-700">
        # {channelName}
      </h2>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <span className="font-bold">{msg.user.username}: </span>
            <span>{msg.content}</span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
    </div>
  )
}

export default Chat