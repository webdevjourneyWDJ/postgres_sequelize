const express = require('express');
const router = express.Router();

module.exports = (userService) => {

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