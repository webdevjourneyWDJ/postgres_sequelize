const Models = require('../models/sequelize');

class UserService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createUser({firstName, lastName, email}){
    try{
      const user = await this.models.User.create({
        firstName,
        lastName,
        email
      });

      return user
    }catch(err){
      return err;
    }
  }

  async getAllUsersAttributes(){
    try {
      const users = await this.models.User.findAll({
        // attributes: ['firstName', 'lastName', 'email']
        attributes: {exclude: ['pa']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async findOneUser(){
    try {
      const user = await this.models.User.findOne({where: {firstName: 'wdj'}});
      return user;
    } catch (err) {
      return err;
    }
  }

  async getAllUsers(){
    try {
      const users = await this.models.User.findAll({
        include: [
          {
            model: this.models.ContactInfo,
            attributes: {exclude: ['updatedAt', 'createdAt', 'UserId']}
          },
          {
            model: this.models.Tweet,
            attributes: {exclude: ['updatedAt', 'UserId']}
          }
        ], 
        attributes: {exclude: ['updatedAt', 'createdAt']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async getAllUsersWhere(){
    try {
      const users = await this.models.User.findAll({where: {firstName: 'wdj'}});
      return users;
    } catch (err) {
      return err;
    }
  }

  async updateUser(){
    try {
      await this.models.User.update({lastName: "lastName changed"},{where: {firstName: 'wdj'}} );
      return "updated User";
    } catch (err) {
      return err;
    }
  }

  async deleteUser(){
    try {
      const user = await this.models.User.destroy({where: {firstName: 'wdj'}});
      return "deleted User";
    } catch (err) {
      return err;
    }
  }

  async followUser(){
    try {
      const currentUser = await this.findOneUser();
      const toFollowUser = await this.models.User.findOne({where: {firstName: 'tom'}});
      currentUser.addUser(toFollowUser);
      return currentUser.getUser();
    } catch (err) {
      return err;
    }
  }

}

module.exports = UserService;