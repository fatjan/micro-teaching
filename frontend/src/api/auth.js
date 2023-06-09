// auth.js
import config from './config';

let currentUser = null; // Initialize currentUser as null
const setCurrentUser = async (user) => {
    currentUser = user; // Set the currentUser with the user data
};
export const getCurrentUser = () => {
  return currentUser; // Get the currentUser data
};
export const clearCurrentUser = () => {
  currentUser = null;
}


let token = null; // Initialize token as null
const setToken = async (data) => {
    token = data; // Set the token with the token data
}
export const getToken = () => {
  return token;
};
export const clearToken = () => {
  token = null;
}

export const login = async (username, password) => {
    try {
      // Perform your login API request here
      // Assuming the response contains the user data
      const response = await fetch(`${config.backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await setCurrentUser(data.user); // Save the user data in auth.js
        await setToken(data.token); // Save the token data in auth.js
        return { success: true, message: 'Login successful', data };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.log('error', error);
      return { success: false, message: 'Error occurred during login' };
    }
  };

export const signup = async (username, password, age, name) => {
    try {
      // Perform your login API request here
      // Assuming the response contains the user data
      const response = await fetch(`${config.backendUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, age, name }),
      });
  
      if (response.ok) {
        const data = await response.json();
        await setCurrentUser(data.user); // Save the user data in auth.js
        await setToken(data.token); // Save the token data in auth.js
        return { success: true, message: 'Login successful', data };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      return { success: false, message: 'Error occurred during login' };
    }
  };

  
  
  
  
  
  
  
  