const express = require("express");
const compression = require('compression');

const api = express();

// controllers
const people = require('./controller/people');

// middlewares
api.use(express.json());
api.use(compression());
// handle cors
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

// Config APIS
api.get('/people-like-you', people.findPeople);

module.exports = api;
