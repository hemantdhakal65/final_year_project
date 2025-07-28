import React, { useState, useEffect } from "react";
import './UserSearch.css';

const UserSearch = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("API did not return an array:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      searchQuery.trim()
        ? users.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : []
    );
  }, [searchQuery, users]);

  const handleSelectUser = (user) => {
    const token = localStorage.getItem('token');
    const selectedUserWithToken = { ...user, token };
    localStorage.setItem('selectedUser', JSON.stringify(selectedUserWithToken));
    onSelectUser(selectedUserWithToken);
  };

  return (
    <div className="user-search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
      />
      <ul>
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <li key={user._id} onClick={() => handleSelectUser(user)}>
                {user.username}
              </li>
            ))
          : searchQuery && <p>No matching users</p>}
      </ul>
    </div>
  );
};

export default UserSearch;
