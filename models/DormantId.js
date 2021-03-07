const { Sequelize } = require('sequelize');

module.exports = class DormantId extends Sequelize.Model {
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'DormantId',
        tableName: 'DormantIds',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
};
