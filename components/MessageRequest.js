import React, { useState, useEffect } from 'react';

const MessageRequest = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewedSenders, setViewedSenders] = useState([]);

  useEffect(() => {
    const storedViewed = localStorage.getItem('viewedSenders');
    if (storedViewed) {
      setViewedSenders(JSON.parse(storedViewed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewedSenders', JSON.stringify(viewedSenders));
  }, [viewedSenders]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(`http://localhost:5000/api/messages`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          const incomingMessages = data.filter(message => 
            message.receiver._id === currentUser._id &&
            message.sender._id !== currentUser._id
          );

          const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
          if (selectedUser?._id && !viewedSenders.includes(selectedUser._id)) {
            setViewedSenders(prev => [...prev, selectedUser._id]);
          }

          const uniqueSenders = incomingMessages
            .filter(message => !viewedSenders.includes(message.sender._id))
            .reduce((acc, message) => {
              if (!acc.some(s => s._id === message.sender._id)) {
                acc.push(message.sender);
              }
              return acc;
            }, []);

          setRequests(uniqueSenders);
        }
      } catch (error) {
        console.error("Error fetching message requests:", error);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [currentUser, viewedSenders]);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="message-request-container" style={{ position: 'relative', marginBottom: '10px' }}>
      <div onClick={toggleDropdown} style={{ cursor: 'pointer', display: 'inline-block' }}>
        <span role="img" aria-label="bell" style={{ fontSize: '24px' }}>🔔</span>
        {requests.length > 0 && (
          <span className="badge" style={{
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            position: 'absolute',
            top: '-5px',
            right: '-5px'
          }}>
            {requests.length}
          </span>
        )}
      </div>
      
      {showDropdown && (
        <div className="dropdown" style={{
          position: 'absolute',
          top: '35px',
          right: 0,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '250px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          {requests.length === 0 ? (
            <p style={{ padding: '10px', margin: 0 }}>No message requests.</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
              {requests.map((sender) => (
                <li key={sender._id} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                  {sender.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageRequest;
