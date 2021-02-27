const express = require('express');
const router = express.Router();

const todosRoute = require('./todos');
const usersRoute = require('./users');

module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/todo', todosRoute(config));
  router.use('/user', usersRoute(config));

  return router;
};