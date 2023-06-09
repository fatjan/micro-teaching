// api/users.js
import { getToken } from './auth';
import config from './config';

const token = getToken();

// Function to fetch users from the API endpoint
export const getUsers = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  };
  