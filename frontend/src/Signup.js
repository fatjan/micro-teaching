import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from './api/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [nameOfUser, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await signup(username, password, age, nameOfUser);
        
        if (response.success) {
          toast.success('Sign-up successful!');
          navigate('/feed');
          toast.success('Welcome!');
        } else {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            toast.error(`Sign-up failed: ${errorData.message}`);
          } else {
            toast.error('Sign-up failed. Please try again.');
          }
        }
      } catch (error) {
        console.log('Error occurred during signup:', error);
        // Handle error, such as displaying an error message
      }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign up</h2>
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
        <input
          type="name"
          placeholder="Name"
          value={nameOfUser}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign up
        </button>
      </form>
      <p style={styles.loginText}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
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

export default Signup;
