import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', email, password);

    try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          console.log('Signup successful');
          // Handle successful signup, such as redirecting to a success page
        } else {
          console.log('Signup failed');
          // Handle signup failure, such as displaying an error message
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign up
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

export default Signup;
