const Models = require('../models/sequelize');

class TweetService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createTweet(UserId, title, description){
    try{
      const tweet = await this.models.Tweet.create({
        UserId,
        title,
        description
      });

      return tweet
    }catch(err){
      return err;
    }
  }

  async getAllTweets(){
    try{
      const allTweets = await this.models.Tweet.findAll({
        include: {
          model: this.models.User,
          attributes: {exclude: ['updatedAt', 'createdAt']}
        }, 
        attributes: {exclude: ['updatedAt', 'UserId']}
      });
      return allTweets
    }catch(err){
      return err;
    }
  }

}

module.exports = TweetService;