const express = require('express');
const router = express.Router();

const UserService = require('../../services/UserService');

module.exports = (config) => {
  const userService = new UserService(config.postgres.client);

  router.get('/', async (req, res) => {
    try{
      const user = await userService.getUser();
      res.send(user);
    }catch(err){
      return next(err);
    }
  });

  return router;
};