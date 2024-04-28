const bycrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide the email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide an valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide the passwotd'],
  },
});

userSchema.pre('save', async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.generateJWT = function () {
  const payload = { userId: this._id, name: this.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

userSchema.methods.comparePasswordHash = async function (userPassword) {
  const isMatch = await bycrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
