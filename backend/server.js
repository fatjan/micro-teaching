const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    });

    newUser.save() // save to database

    res.status(201).json({ message: 'User registered successfully' });
  });
  
// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists
  const user = await User.findOne({ username });
  console.log('user', user);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Verify the password: compare the provided password with the hashed password
  const passwordMatch = bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate and send a JWT token
  const token = jwt.sign({ username: user.username, name: user.name }, 'secretKey');
  res.json({ message: 'Login successful', token });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});