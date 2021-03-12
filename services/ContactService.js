const Models = require('../models/sequelize');

class ContactService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createContactInfo(phone, UserId){
    try{
      const contactInfo = await this.models.ContactInfo.create({
        phone,
        UserId
      });

      return contactInfo
    }catch(err){
      return err;
    }
  }

  async deleteContact(){
    try {
      const contactInfo = await this.models.ContactInfo.destroy({where: {phone: '6586985632'}});
      return "deleted Contact";
    } catch (err) {
      return err;
    }
  }

}

module.exports = ContactService;