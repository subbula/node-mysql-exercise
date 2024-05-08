const {Sequelize,DataTypes} = require("sequelize");
const config = require("./dev-config.json");
const sequelize = new Sequelize(config.database,config.username,config.password,{host: 'localhost',dialect:config.dialect});
module.exports = sequelize;