import React, { useState } from "react";

const Inbox = ({ selectedUser, onNewMessage }) => {
  const [messageContent, setMessageContent] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSend = async () => {
    if (!currentUser) {
      console.error("No current user found in localStorage.");
      return;
    }
    if (!selectedUser) {
      console.error("No selected user found.");
      return;
    }
    if (!messageContent.trim()) {
      return; 
    }

    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content: messageContent,
    };
  const token = localStorage.getItem("token");
  console.log("Token being sent:", token); 

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        
        const newMessage = await response.json();
        onNewMessage(newMessage);
        setMessageContent("");
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="inbox">
      <div className="message-input">
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Inbox;
