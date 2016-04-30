module.exports = {
  host: process.env.RDB_HOST|| 'localhost',
  port: process.env.RDB_PORT || 28015,
  db: process.env.RDB_DB || 'space_pirates',
  db: 'space_pirates',
  tables: {
    'users': 'users_id',
    'games': 'games_id'
  }
};
