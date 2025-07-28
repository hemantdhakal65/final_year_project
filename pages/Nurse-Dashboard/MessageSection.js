import React, { useState, useEffect } from "react";
import MessageList from "../../components/MessageList";
import UserSearch from "../../components/UserSearch";
import Inbox from "../../components/Inbox";
import MessageRequest from "../../components/MessageRequest"; 

const MessageSection = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    const storedSelectedUser = localStorage.getItem("selectedUser");
    if (storedSelectedUser) {
      setSelectedUser(JSON.parse(storedSelectedUser));
    }
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser) return;
      try {
        let url = "http://localhost:5000/api/messages";
        if (selectedUser) {
          url += `?otherUserId=${selectedUser._id}`;
        }
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentUser) {
      fetchMessages(); 
      const interval = setInterval(fetchMessages, 1000); 
      return () => clearInterval(interval);
    }
  }, [currentUser, selectedUser]);

  const handleNewMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    localStorage.setItem("selectedUser", JSON.stringify(user));
  };

  return (
    <div className="message-section">
      
      <MessageRequest currentUser={currentUser} />

      <UserSearch onSelectUser={handleSelectUser} />

      <h2>
        {selectedUser
          ? `Chat with ${selectedUser.username}`
          : "All Conversations"}
      </h2>

      <MessageList messages={messages} currentUser={currentUser} />

      {selectedUser && (
        <Inbox selectedUser={selectedUser} onNewMessage={handleNewMessage} />
      )}
    </div>
  );
};

export default MessageSection;
