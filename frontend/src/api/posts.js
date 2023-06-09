import { getToken } from './auth';
import config from './config';

export const fetchPosts = async () => {
    const token = getToken();
    try {
      const response = await fetch(`${config.backendUrl}/feed`, {
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

export const createPost = async (content) => {
    const token = getToken();
    try {
      const response = await fetch(`${config.backendUrl}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      return response; // Save the posts data in feed.js
    } catch (error) {
      return { success: false, message: 'Error occurred during login' };
    }
};
