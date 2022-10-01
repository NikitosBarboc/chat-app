import express from 'express';
const { validationResult } = require('express-validator')

module.exports = function validation(req: express.Request, res: express.Response) {
  const errors = validationResult(req);
  console.log(req.body)
  if (!errors.isEmpty()) res.status(400).json({
    success: false,
    message: "Validation error" 
  });
};
