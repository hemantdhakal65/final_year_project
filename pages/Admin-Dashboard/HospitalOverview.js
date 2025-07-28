import React from 'react';

const HospitalOverview = () => {
    return (
        <div style={styles.container}>
            <h2>Hospital Overview</h2>
            <div style={styles.infoContainer}>
                <p>Total Doctors: 120</p>
                <p>Total Nurses: 50</p>
                <p>Total Patients: 200</p>
                <p>Active Staff: 170</p>
            </div>
        </div>
    );
};


const styles = {
    container: {
        marginTop: '20px',
        paddingLeft: '20px', 
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px', 
        fontSize: '16px',
    },
};

export default HospitalOverview;
