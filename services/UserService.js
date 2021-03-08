const Models = require('../models/sequelize');

class UserService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createUser({firstName, lastName, email, password}){
    try{
      const user = await this.models.User.create({
        firstName,
        lastName,
        email,
        password
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
      const user = await this.models.User.findOne({where: {firstName: 'tom'}});
      return user;
    } catch (err) {
      return err;
    }
  }

  async getAllUsers(){
    try {
      const users = await this.models.User.findAll();
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
      const user = await this.models.User.restore({where: {firstName: 'test SET'}});
      return "deleted User";
    } catch (err) {
      return err;
    }
  }

}

module.exports = UserService;