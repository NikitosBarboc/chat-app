const express = require('express');
const { port, mongoUri } = require("../config/default.json")
const mongoose = require("mongoose");
// const route = require('../routes/auth');
const path = require("path");
const app = express();
const PORT = port || 5000; 

app.use(express.json({ extended: false }));
app.use('/api/auth', require('../routes/auth'));


const start = async  () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(PORT, () => {
      console.log(`server is listening on ${PORT}...`);
    });
  } catch(e: unknown) {
    const error = e as Error;
    console.log('Server Error', error.message);
    process.exit(1);
  }
}

start();
