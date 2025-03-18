"use client"

import { useState, useEffect, useContext } from "react"
import { Search, Send } from "lucide-react"
import { AuthContext } from "../contexts/AuthContext"

const Messages = () => {
  const { currentUser } = useContext(AuthContext)
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Fetch conversations (mock data)
    const fetchConversations = async () => {
      try {
        // In a real app, this would be an API call
        const mockConversations = [
          {
            id: 1,
            with: {
              id: 101,
              name: "John Doe",
              avatar: "/placeholder.svg?height=50&width=50&text=JD",
            },
            lastMessage: {
              text: "Is this item still available?",
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
              isRead: true,
              sender: 101,
            },
            messages: [
              {
                id: 1,
                text: "Hi, I'm interested in your Áo dài truyền thống màu đỏ.",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                sender: 101,
              },
              {
                id: 2,
                text: "Hello! Yes, it's still available.",
                timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
                sender: currentUser.id,
              },
              {
                id: 3,
                text: "Great! Does it come in size M?",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
                sender: 101,
              },
              {
                id: 4,
                text: "Yes, it's available in size M. Would you like to purchase it?",
                timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
                sender: currentUser.id,
              },
              {
                id: 5,
                text: "Is this item still available?",
                timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
                sender: 101,
              },
            ],
          },
          {
            id: 2,
            with: {
              id: 102,
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=50&width=50&text=JS",
            },
            lastMessage: {
              text: "Thank you for the quick delivery!",
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
              isRead: false,
              sender: 102,
            },
            messages: [
              {
                id: 1,
                text: "Hi, I just received my order. Thank you for the quick delivery!",
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                sender: 102,
              },
            ],
          },
        ]

        setConversations(mockConversations)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching conversations:", error)
        setLoading(false)
      }
    }

    fetchConversations()
  }, [currentUser.id])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!message.trim() || !activeConversation) return

    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      sender: currentUser.id,
    }

    // Update conversations with new message
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            lastMessage: {
              text: message,
              timestamp: new Date().toISOString(),
              isRead: true,
              sender: currentUser.id,
            },
            messages: [...conv.messages, newMessage],
          }
        }
        return conv
      }),
    )

    // Update active conversation
    setActiveConversation((prev) => ({
      ...prev,
      lastMessage: {
        text: message,
        timestamp: new Date().toISOString(),
        isRead: true,
        sender: currentUser.id,
      },
      messages: [...prev.messages, newMessage],
    }))

    // Clear message input
    setMessage("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.with.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-5">
      <h1 className="mb-4">Messages</h1>

      <div className="card">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-4 border-end">
              <div className="p-3 border-bottom">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search messages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="conversations-list" style={{ height: "600px", overflowY: "auto" }}>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">No conversations found</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`conversation-item p-3 border-bottom ${activeConversation?.id === conv.id ? "bg-light" : ""} ${!conv.lastMessage.isRead && conv.lastMessage.sender !== currentUser.id ? "fw-bold" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveConversation(conv)}
                    >
                      <div className="d-flex">
                        <img
                          src={conv.with.avatar || "/placeholder.svg"}
                          alt={conv.with.name}
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{conv.with.name}</h6>
                            <small className="text-muted">
                              {new Date(conv.lastMessage.timestamp).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="text-truncate mb-0" style={{ maxWidth: "200px" }}>
                            {conv.lastMessage.sender === currentUser.id ? "You: " : ""}
                            {conv.lastMessage.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="col-md-8">
              {activeConversation ? (
                <div className="d-flex flex-column h-100">
                  <div className="p-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <img
                        src={activeConversation.with.avatar || "/placeholder.svg"}
                        alt={activeConversation.with.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <div>
                        <h5 className="mb-0">{activeConversation.with.name}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow-1 p-3" style={{ height: "500px", overflowY: "auto" }}>
                    {activeConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.sender === currentUser.id ? "justify-content-end" : "justify-content-start"}`}
                      >
                        {msg.sender !== currentUser.id && (
                          <img
                            src={activeConversation.with.avatar || "/placeholder.svg"}
                            alt={activeConversation.with.name}
                            className="rounded-circle me-2 align-self-end"
                            width="30"
                            height="30"
                          />
                        )}
                        <div
                          className={`message-bubble p-3 rounded-3 ${
                            msg.sender === currentUser.id ? "bg-primary text-white" : "bg-light"
                          }`}
                          style={{ maxWidth: "75%" }}
                        >
                          <p className="mb-0">{msg.text}</p>
                          <small
                            className={`d-block text-end ${
                              msg.sender === currentUser.id ? "text-white-50" : "text-muted"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-top mt-auto">
                    <form onSubmit={handleSendMessage}>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary" disabled={!message.trim()}>
                          <Send size={18} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-5">
                  <div className="mb-4">
                    <img
                      src="/placeholder.svg?height=100&width=100&text=Messages"
                      alt="Select a conversation"
                      className="img-fluid"
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                  <h4>Select a conversation</h4>
                  <p className="text-muted">Choose a conversation from the list to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages

