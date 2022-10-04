import express from 'express';
const jwt = require('jsonwebtoken');
const User = require('../../modules/User');
const bcrypt = require('bcryptjs');
const validation = require('../../middleware/registerValidation');
const { jwtSecret } = require("../../config/default.json");

export async function registerUser(req: express.Request, res: express.Response)  {
  try {
    
    if (!validation(req, res)) return;

    const { email, password, name } = req.body;
    const candidateEmail = await User.findOne({ email });
    const candidateName = await User.findOne({ name });

    if (candidateEmail && candidateName) {
      res.status(417).json({ success: false, message: 'User with this data already exist' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    console.log(user);
    const token = jwt.sign(
      { userId: user.id },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ success: true, message: "User was successful created", token, userId: user.id });

  } catch(e) {
    res.status(500).json({ success: false, message: "Something went wrong"});
  }
}

export async function logInUser (req: express.Request, res: express.Response) {
  try {
    if (!validation(req, res)) return;

    const { nameOrEmail, password } = req.body;

    let user = await User.findOne({ email: nameOrEmail.toLowerCase()})
    user = !user ? await User.findOne({ name: nameOrEmail }) : user
    if (!user) {
      res.status(404).json({ success: false, message: "This user does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ success: false, message: "something went wrong" });
      return
    }

    const token = jwt.sign(
      { userId: user.id },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ success: true, message: 'User was successful login', token, userId: user.id });

  } catch(e) {
    res.status(500).json({ success: false, message: "Something went wrong"});
    return;
  }
}
