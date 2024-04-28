const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const {
  CustomErrorAPI,
  UnathenticationError,
} = require('../middlewares/errorHandler');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnathenticationError('Invalid Credentials');
  }

  const isMatched = await user.comparePasswordHash(password);
  if (!isMatched) {
    throw new UnathenticationError('Invalid Credentials Provided');
  }
  const token = user.generateJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
    },
    token,
  });
};

const register = async (req, res) => {
  const user = req.body;

  let createdUser = await User.create({ ...user });
  if (!createdUser) {
    throw new CustomErrorAPI(
      'Failed to created an user',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const token = createdUser.generateJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      username: createdUser.name,
    },
    token,
  });
};

module.exports = { login, register };
