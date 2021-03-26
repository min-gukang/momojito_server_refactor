const { Sequelize } = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: 'local',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Cocktail, {
      through: 'Favorites',
      as: 'FFavorites',
    });
    db.User.belongsToMany(db.Cocktail, { through: "Rating", as: 'RRatings' });
    db.User.hasMany(db.Comment);
  }
};
