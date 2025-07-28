import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h2>User Management</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/Register')}>Add Users</button>
                <button style={styles.button} onClick={() => navigate('/RemoveUser')}>Remove Users</button>
            </div>
        </div>
    );
};


const styles = {
    container: {
        marginTop: '20px',
        paddingLeft: '20px',  
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',  
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    }
};

export default UserManagement;
