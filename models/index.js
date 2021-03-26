const Sequelize = require('sequelize');
const config = require('../config/config')['test'];
const User = require('./User');
const Cocktail = require('./Cocktail');
const Comment = require('./Comment');
const DormantId = require('./DormantId');
const Rating = require('./Rating')

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
db.Rating = Rating;

User.init(sequelize);
Cocktail.init(sequelize);
Comment.init(sequelize);
DormantId.init(sequelize);
Rating.init(sequelize);

User.associate(db);
Cocktail.associate(db);
Comment.associate(db);
DormantId.associate(db);
Rating.associate(db); //이건 필요없음 

module.exports = db;
