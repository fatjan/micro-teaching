import { getToken } from './auth';

let posts = null;
const token = getToken();

export const fetchPosts = async () => {
    try {
      const response = await fetch('/feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; // Save the posts data in feed.js
      } else {}
    } catch (error) {
      return { success: false, message: 'Error occurred during login' };
    }
  };

