const express = require('express');
const { login, register } = require('../controllers/authController');
const {
  registerValidate,
  loginValidate,
} = require('../middlewares/validationMiddleware');
const router = express.Router();

router.route('/login').post(loginValidate, login);
router.route('/register').post(registerValidate, register);
module.exports = router;
