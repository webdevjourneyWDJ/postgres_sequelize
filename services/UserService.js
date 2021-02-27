const Models = require('../models/sequelize');

class UserService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async getUser(){
    return 'UserService: Getting a User from Database';
  }

}

module.exports = UserService;