import React from 'react';

const Reports = () => {
    return (
        <div style={styles.container}>
            <h2>Reports</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button}>Generate Monthly Report</button>
                <button style={styles.button}>Generate Financial Report</button>
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

export default Reports;
