import React, { useState, useEffect } from 'react';
import './alert.css';

const Alerts = ({ onAlertUpdate }) => {
  const [currentData, setCurrentData] = useState({
    weight: null,
    percentage: null,
    alert: false,
    loading: true,
    error: null
  });
  const [history, setHistory] = useState([]);
  const [localAlertCount, setLocalAlertCount] = useState(0);
  const [isBelowThreshold, setIsBelowThreshold] = useState(false);

  useEffect(() => {
    const es = new EventSource('http://localhost:5000/api/arduino/serial-stream');
    
    const handleMessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.weight === null && data.percentage === null) return;

        setCurrentData(prev => ({
          weight: data.weight ?? prev.weight,
          percentage: data.percentage ?? prev.percentage,
          alert: data.alert,
          loading: false,
          error: null
        }));

        setHistory(prev => [
          {
            ...data,
            timestamp: new Date().toLocaleTimeString()
          },
          ...prev.slice(0, 14)
        ]);
      } catch(err) {
        setCurrentData(prev => ({
          ...prev,
          error: 'Data format error',
          loading: false
        }));
      }
    };

    es.addEventListener('message', handleMessage);
    es.onerror = () => {
      setCurrentData(prev => ({
        ...prev,
        error: 'Connection issue',
        loading: false
      }));
    };

    return () => es.close();
  }, []);

  useEffect(() => {
    if (!currentData.loading && currentData.percentage != null) {
      if (currentData.percentage < 20) {
        if (!isBelowThreshold) {
          const newCount = localAlertCount + 1;
          setLocalAlertCount(newCount);
          setIsBelowThreshold(true);
          if (onAlertUpdate) {
            onAlertUpdate(newCount);
          }
        }
      } else {
        setIsBelowThreshold(false);
      }
    }
  }, [currentData, isBelowThreshold, localAlertCount, onAlertUpdate]);

  const alertMessage =
    !currentData.loading && currentData.percentage != null
      ? currentData.percentage < 20
        ? "sline goes low. please be careful"
        : "everything is okay"
      : '';

  const bannerClass =
    !currentData.loading && currentData.percentage != null
      ? currentData.percentage < 20
        ? "alert-banner red"
        : "alert-banner green"
      : "alert-banner";

  return (
    <div className="alert-system">
      <h2>Real-time Sline Water Monitoring (Alerts Section)</h2>
      
      {!currentData.loading && alertMessage && (
        <div className={bannerClass}>
          {alertMessage}
        </div>
      )}

      {currentData.error && (
        <div className="error-banner">⚠️ {currentData.error}</div>
      )}

      <div className="current-status" data-loading={currentData.loading}>
        {currentData.loading ? (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Initializing connection...</p>
          </div>
        ) : (
          <>
            <div className="data-row">
              <span>Weight:</span>
              <strong>{currentData.weight?.toFixed(1) ?? '--'}g</strong>
            </div>
            <div className="data-row">
              <span>Percentage:</span>
              <strong>{currentData.percentage?.toFixed(1) ?? '--'}%</strong>
            </div>
            {currentData.alert && (
              <div className="alert-flash">🚨 LOW WEIGHT!</div>
            )}
          </>
        )}
      </div>

      <h3>Recent Readings</h3>
      <div className="history-grid">
        {history.map((entry, i) => (
          <div key={i} className={`history-item ${entry.alert ? 'alert' : ''}`}>
            <div>{entry.timestamp}</div>
            <div>{entry.weight?.toFixed(1) ?? '--'}g</div>
            <div>{entry.percentage?.toFixed(1) ?? '--'}%</div>
            {entry.alert && <div className="alert-marker">⚠️</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
