const path = require('path');
const os = require("os");

const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const userDataPathDev = path.join(os.homedir(), "AppData", "Roaming", "CashInBox" , "Desenvolvimento");

module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(userDataPathDev, 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    pool: {
      min: 1,
      max: 1
      // ❌ Não usar "afterCreate" com better-sqlite3
    }
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(userDataPath, 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      tableName: 'knex_migrations'
    },
    pool: {
      min: 1,
      max: 1
    }
  }
};
