import express from 'express';
const { validationResult } = require('express-validator')

module.exports = function validation(req: express.Request, res: express.Response) {
  try {
    const errors = validationResult(req);
    const { name, email } = await req.body;
    const isEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    
    if (!errors.isEmpty() || (!isEmail && !name)) {
      res.status(400).json({
        success: false,
        message: "Incorrect password",
        errors: errors.array(),
      });
      return false;
    } 
    return true;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }

};

check('email', 'incorrect email').isEmail() || 