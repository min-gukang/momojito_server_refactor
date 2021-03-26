const { Sequelize } = require('sequelize');
const User = require('./User');
const Cocktail = require('./Cocktail');

module.exports = class Rating extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        UserId: {
          type: Sequelize.INTEGER(100),
          allowNull: false,
          references: {
              model: User,
              key: 'id'
          }
        },
        CocktailId: {
          type: Sequelize.INTEGER(100),
          allowNull: false,
          references: {
              model: Cocktail,
              key: 'id'
          }
        },
        score: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Rating',
        tableName: 'ratings',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
};
