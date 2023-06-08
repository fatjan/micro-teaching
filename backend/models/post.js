const mongoose = require('mongoose');

// Define the post schema
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
