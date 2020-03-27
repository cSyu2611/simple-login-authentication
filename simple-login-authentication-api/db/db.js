const SQL3 = require('sqlite3').verbose();
const users_db = new SQL3.Database('data/users.sqlite');

module.exports = {
  users_db: users_db
};