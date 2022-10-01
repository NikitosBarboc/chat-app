import express from 'express';
// const express = require('express');
// const { Router } = require('express');
const route = express.Router();
const User = require('../modules/User');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const validation = require('../middleware/validation');

route.post(
  "/register",
  [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'incorrect password').isStrongPassword(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {

      validation(req, res);

      const { email, password, name } = req.body;
      const candidateEmail = await User.findOne({ email });
      const candidateName = await User.findOne({ name });

      if (candidateEmail && candidateName) {
        res.status(417).json({ success: false, message: 'User with this data already exist' });
        return;
      }

      const hashedPassword = await bcrypt(password, 12);
      const user = new User({ email, name, password: hashedPassword });
      await user.save();

      res.status(201).json({ success: true, message: "User was successful created" });

    } catch(e) {
      res.status(500).json({ success: true, message: "Something went wrong"});
    }
});

route.post("/login",
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'incorrect password').isStrongPassword(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {

      validation(req, res);

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ success: false, message: "This user does not exist" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ success: false, message: "something went wrong" });
        return
      }

      res.status(200).json({ success: true, message: 'User was successful login' });

    } catch(e) {
      res.status(500).json({ success: true, message: "Something went wrong"});
    }
  }
);
module.exports = route;
