const { BadRequestError } = require('./errorHandler');

const registerValidate = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError(`Please provide all the requied details`);
  }
  next();
};

const loginValidate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`Please provide all the requied details`);
  }
  next();
};

const jobCreateValidate = (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError(`Please provide all the requied details`);
  }
  next();
};

module.exports = { registerValidate, loginValidate, jobCreateValidate };
