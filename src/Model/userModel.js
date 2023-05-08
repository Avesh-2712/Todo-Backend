const Model = require("../Config/dbConnection");

class User extends Model {
  static get tableName() {
    return "mytest";
  }
  static get idColumn() {
    return "id";
  }
}

module.exports = User;
