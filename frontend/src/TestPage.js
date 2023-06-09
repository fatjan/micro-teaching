import React, { useState } from 'react';

const TestPage = () => {
  const [result, setResult] = useState('');

  const handleTestClick = () => {
    fetch('/health')
      .then(response => response.text())
      .then(data => setResult(data))
      .catch(error => setResult('Error: ' + error.message));
  };

  return (
    <div>
      <h1>Backend App Connection Test</h1>
      <button onClick={handleTestClick}>Test Connection</button>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default TestPage;
