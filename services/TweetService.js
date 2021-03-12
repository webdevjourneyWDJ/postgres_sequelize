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

}

module.exports = TweetService;