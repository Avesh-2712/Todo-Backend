const Model = require('../Config/dbConnection');

class Product extends Model {
    static get tableName() {
        return 'products'
    }
    static get idColumn() {
        return 'id'
    }
};

module.exports = Product