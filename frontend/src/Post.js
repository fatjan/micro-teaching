import React from 'react';
import picture from './pictures/cute.jpeg';

const Post = ({ content, name, timestamp }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img className="profile-picture" src={picture} alt="Profile" />
        <div className="post-info">
          <h3 className="name">{name}</h3>
          <p className="timestamp">{timestamp}</p>
        </div>
      </div>
      <p className="post-content">{content}</p>
    </div>
  );
};

export default Post;
