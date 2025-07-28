import React from 'react';

const SystemSettings = () => {
    return (
        <div style={styles.container}>
            <h2>System Settings</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button}>Manage User Roles</button>
                <button style={styles.button}>Update Hospital Info</button>
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

export default SystemSettings;
