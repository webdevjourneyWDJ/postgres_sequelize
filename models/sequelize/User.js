const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'John',
      get() {
        const rawValue = this.getDataValue('firstName');
        return rawValue ? rawValue.toUpperCase() : null;
      },
      set(value){
        this.setDataValue('firstName', `${value} SET`);
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Doe'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue('password', `hashed(${value})`);
      }
    },
  },{
    // freezeTableName: true
    tableName: "Employees",
    timestamps:true,
    createdAt: false,
    updatedAt: 'updateTimeStamp',
    paranoid: true
  });

  sequelize.sync({alter: true}); //force: true
}