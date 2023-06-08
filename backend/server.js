const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('./models/post');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://fatmastorage:bEIZ7pgb6olEbjEl@cluster0.yrfbwe3.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });


// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, age, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
        name,
        age,
        username,
        password,
        role: 'user',
    });

    newUser.save() // save to database

    res.status(201).json({ message: 'User registered successfully' });
  });


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Verify the password: compare the provided password with the hashed password
  const passwordMatch = bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate and send a JWT token
  const payload = { userId: user._id, username: user.username, name: user.name, role: user.role };
  console.log('payload', payload);
  const secretKey = 'this-is-a-secret-key';
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});


// Get all users endpoint
app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


// Post feed endpoint
app.post('/feed', async (req, res) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    return res.status(401).json({ message: 'Missing authorization header.' });
  }

  const { content } = req.body;

  try {
    const secretKey = 'this-is-a-secret-key';
    const decoded = jwt.verify(token, secretKey);
    const userRole = decoded.role;
    if (userRole !== 'user') {
      return res.status(401).json({ message: 'You are not authorized to post a feed.' });
    }
    
    // Create a new post instance
    const newPost = new Post({
      content,
      author: decoded.userId // Assuming you have user authentication and can access the current user's ID
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Send a success response
    return res.status(201).json({ message: 'Feed posted successfully', post: savedPost });
  } catch (error) {
    return res.status(401).json({ message: `${error}` });
  }
});


// Get all posts endpoint
app.get('/feed', async (req, res) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    return res.status(401).json({ message: 'Missing authorization header.' });
  }

  try {
    const secretKey = 'this-is-a-secret-key';
    const decoded = jwt.verify(token, secretKey);
    const userRole = decoded.role;
    if (userRole !== 'admin') {
      return res.status(401).json({ message: 'You are not authorized to get all posts from feed.' });
    }
    
    const posts = await Post.find({}).populate('author');
    return res.status(201).json({ message: 'Feed obtained successfully', posts });
  } catch (error) {
    return res.status(401).json({ message: `${error}` });
  }

});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});