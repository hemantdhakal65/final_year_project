import React from 'react';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p>No messages yet. Start the conversation!</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id} className="message-item">
              <strong>
                {String(message.sender._id) === String(currentUser?._id) ? 'You' : message.sender.username}:
              </strong>
              <span>{message.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
