import express from 'express';
import { registerUser, logInUser } from './controllers/user';
const route = express.Router();
const { check } = require('express-validator');


route.post(
  "/register",
  [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'incorrect password').isStrongPassword(),
  ],
  registerUser
);

route.post("/login",
  [
    check('password', 'incorrect password').isStrongPassword(),
  ],
  logInUser
);

module.exports = route;
