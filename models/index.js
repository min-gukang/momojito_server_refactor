const Sequelize = require('sequelize');
const config = require('../config/config')['test'];
const User = require('./User');
const Cocktail = require('./Cocktail');
const Comment = require('./Comment');
const DormantId = require('./DormantId');

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
db.DormantId = DormantId;

User.init(sequelize);
Cocktail.init(sequelize);
Comment.init(sequelize);
DormantId.init(sequelize);

User.associate(db);
Cocktail.associate(db);
Comment.associate(db);
DormantId.associate(db);

module.exports = db;
