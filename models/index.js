const Sequelize = require('sequelize');
const config = require('../config/config')['development'];
const User = require('./User');
const Cocktail = require('./Cocktail');
const Comment = require('./Comment');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Cocktail = Cocktail;
db.Comment = Comment;

User.init(sequelize);
Cocktail.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Cocktail.associate(db);
Comment.associate(db);

module.exports = db;
