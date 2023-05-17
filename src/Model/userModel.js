const Model = require("../Config/dbConnection");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get idColumn() {
    return "user_id";
  }
}

module.exports = User;
