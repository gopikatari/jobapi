const { NotFoundError } = require('./errorHandler');

const notFound = (req, res) => {
  throw new NotFoundError('Not Route exists!');
  // return res.status(404).json({
  //   message: 'not routes found',
  // });
};

module.exports = notFound;
