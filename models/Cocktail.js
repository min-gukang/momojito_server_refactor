const { Sequelize } = require('sequelize');

module.exports = class Cocktail extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        koName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        avrRate: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Cocktail',
        tableName: 'cocktails',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Cocktail.belongsToMany(db.User, { through: 'Favorites' });
    db.Cocktail.belongsToMany(db.User, { through: 'Ratings' });
  }
};
