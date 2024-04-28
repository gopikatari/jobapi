const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { UnathenticationError, CustomErrorAPI } = require('./errorHandler');
const { StatusCodes } = require('http-status-codes');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnathenticationError('Authentication Failed!');

  try {
    const token = authHeader.split(' ')[1];
    if (!token)
      throw new CustomErrorAPI('Token Missing', StatusCodes.FORBIDDEN);

    //verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnathenticationError(`Authentication Failed!!`);
  }
};

module.exports = authenticate;
