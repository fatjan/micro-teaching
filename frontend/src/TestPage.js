import React, { useState } from 'react';
import config from './api/config';

const TestPage = () => {
  const [result, setResult] = useState('');

  const handleTestClick = () => {
    fetch(`${config.backendUrl}/health`)
      .then(response => response.text())
      .then(data => setResult(data))
      .catch(error => setResult('Error: ' + error.message));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Backend App Connection Test</h1>
      <button style={styles.button} onClick={handleTestClick}>Test Connection</button>
      <div style={styles.resultContainer}>
        <p style={styles.resultText}>Result: {result}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  resultText: {
    fontSize: '18px',
    margin: 0,
  },
};

export default TestPage;
