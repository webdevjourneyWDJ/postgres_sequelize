const express = require('express');
const router = express.Router();

module.exports = (todoService) => {

  router.get('/', async (req, res) => {
    try{
      const todo = await todoService.getTodo();
      res.send(todo);
    }catch(err){
      return next(err);
    }
  });

  return router;
};