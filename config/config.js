const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'momojito_refactoring',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'momojito_Refactor_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
