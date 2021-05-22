require('dotenv/config');
module.exports = {

  development: {
    client: 'pg',
    debug: true,
    connection: process.env.BASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    ssl: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/teste.sqlite'
    },
    migrations:{
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    debug: true,
    connection:"postgres://yzewdzri:c-cKe_6iYwIF5ef0bFVnEpIP8IsR194w@tuffi.db.elephantsql.com/yzewdzri",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'  // <-- here
    },
    ssl: true
  }

};
