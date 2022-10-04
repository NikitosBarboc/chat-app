import express from 'express';
const { validationResult } = require('express-validator')

module.exports = function validation(req: express.Request, res: express.Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error",
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
