const {DataTypes} = require("sequelize");
const sequelize = require('../config/database')
const Users = sequelize.define('User',{
   id:{
    type:DataTypes.NUMBER,
    allowNull:false,
    autoIncrement: true,
    primaryKey:true
   },
   name:{
    type:DataTypes.STRING,
    allowNull:false
   },
   email:{
    type:DataTypes.STRING,
    allowNull:false
   }
},{timestamps:true});

(async () => {
   await sequelize.sync(); // Sync the model with the database
 })();
module.exports = Users;