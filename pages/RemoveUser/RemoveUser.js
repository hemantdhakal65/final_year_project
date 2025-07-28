import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RemoveUser = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users', err);
                setError('Unable to load users.');
            }
        };
        fetchUsers();
    }, []);

    const handleRemoveUser = async () => {
        if (!username) {
            setError('Please enter a username.');
            return;
        }

        if (!users.some(user => user.username === username)) {
            setError('User not found!');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${username}`);
            setMessage(response.data.message);
            setError(null);
            setUsername('');
            setUsers(users.filter(user => user.username !== username));

            setTimeout(() => navigate('/admindashboard'), 1000);
        } catch (err) {
            console.error('Error deleting user', err);
            setError('Failed to delete user.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Remove User</h2>
            <input
                type="text"
                placeholder="Enter username to delete"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleRemoveUser} style={styles.button}>Remove User</button>
            {error && <div style={styles.error}>{error}</div>}
            {message && <div style={styles.success}>{message}</div>}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',  
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '300px',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        fontSize: '14px',
        marginTop: '10px',
    }
};

export default RemoveUser;
