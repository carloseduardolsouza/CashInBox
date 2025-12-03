const path = require('path');
const os = require("os");

// Captura a pasta segura do sistema
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const userDataPathDev = path.join(os.homedir(), "AppData", "Roaming", "CashInBox" , "Desenvolvimento");

module.exports = {
  // Ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(userDataPathDev, 'database.sqlite')
    },
    useNullAsDefault: true, // Necessário para SQLite
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    pool: {
      // Configurações de pool de conexões
      min: 1,
      max: 5,
      afterCreate: (conn, cb) => {
        // Habilita foreign keys no SQLite
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  },

  // Ambiente de produção
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(userDataPath, 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  }
};