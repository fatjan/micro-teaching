const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  username: String,
  password: String,
});

// Hash the password before saving
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;