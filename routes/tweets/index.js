const express = require('express');
const router = express.Router();

const UserService = require('../../services/UserService');
const TweetService = require('../../services/TweetService');

module.exports = (config) => {
  const userService = new UserService(config.postgres.client);
  const tweetService = new TweetService(config.postgres.client);

  router.post('/create', async (req, res, next) => {
    try{
      const user = await userService.findOneUser();
      const tweet = await tweetService.createTweet(user.id, req.body.title, req.body.description);
      res.send({user, tweet});
    }catch(err){
      return next(err);
    }
  });

  router.get('/all', async (req, res, next) => {
    try{
      const tweetList = await tweetService.getAllTweets();
      res.send(tweetList);
    }catch(err){
      return next(err);
    }
  });

  return router;
};