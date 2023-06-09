import React, { useState } from 'react';
import { login } from './api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const navigateToFeed = () => {
    navigate("/feed"); // Navigate to the '/feed' route
  };

  const navigateToUsers = () => {
    navigate("/users"); // Navigate to the '/feed' route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const result = await login(username, password);
    if (result.success) {
      // Redirect to the feed page or perform any desired actions
      toast.success('Login successful!');
      navigateToFeed();
    } else {
      const errorData = await result.json();
      if (errorData && errorData.message) {
        toast.error(`Login failed: ${errorData.message}`);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3e5f5',
  },
  heading: {
    color: '#880e4f',
    marginBottom: '1.5rem',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '300px',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: 'none',
    borderRadius: '5px',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#9c27b0',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
