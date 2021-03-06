const { Sequelize } = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        text: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        contents: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Cocktail',
        tableName: 'Cocktails',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
  }
};
