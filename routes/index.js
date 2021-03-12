const express = require('express');
const router = express.Router();

const usersRoute = require('./users');
const tweetsRoute = require('./tweets');

module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/user', usersRoute(config));
  router.use('/tweet', tweetsRoute(config));

  return router;
};