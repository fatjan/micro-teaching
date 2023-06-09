import React, { useState } from 'react';
import './post-form.css';

const PostForm = ({ onPost }) => {
  const [postText, setPostText] = useState('');

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPost(postText);
    setPostText('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={postText}
        onChange={handlePostTextChange}
        placeholder="Write your post..."
        rows={3}
        required
        className="post-textarea"
      />
      <button type="submit" className="post-button">Post</button>
    </form>
  );
};

export default PostForm;
