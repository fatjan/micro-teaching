import React, { useState, useEffect } from 'react';
import Post from './Post';
import './feed.css';
import PostForm from './PostForm';
import { getCurrentUser, clearToken, clearCurrentUser } from './api/auth';
import { formatTimestamp } from './utils';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost } from './api/posts';

const Feed = () => {
    const [feedPosts, setPosts] = useState([]);
    const currentUser = getCurrentUser();
    const { name, role } = currentUser;
    const navigate = useNavigate();
    
    useEffect(() => {
      fetchPosts().then((data) => {
        setPosts(data.posts.reverse());
      });
      }, []);

    const handlePost = async (postText) => {
    try {
        const response = await createPost(postText);
        if (response.ok) {
          // Refetch the updated post data
          const updatedPosts = await fetchPosts();
          setPosts(updatedPosts.posts.reverse());
        } else {
        throw new Error('Failed to create post');
        }
    } catch (error) {
        console.error(error);
        // Handle the error
    }
    };

    const handleLogout = () => {
        // Clear token and current user from local storage
        clearToken();
        clearCurrentUser();
        
        // Redirect to the login page
        navigate('/login'); 
      };

    return (
        <div className="feed-container">
            <div className="header">
                <div className="feed-posts">
                <h1 className="feed-title">Feed Page</h1>
                <div className="user-info">
                    <p className="user-name">{name}</p>
                    <p className="user-role">{role}</p>
                    {/* <Link to="/update-user">
                        <button className="update-user-button">Update User</button>
                    </Link> */}
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <PostForm onPost={handlePost} />
                    {/* Render the list of posts */}
                    {feedPosts.map((post) => (
                        <Post key={post._id} content={post.content} name={post.author.name} timestamp={formatTimestamp(post.createdAt)} />
                    ))}
                </div>
                </div>
        </div>
    );
};

export default Feed;
