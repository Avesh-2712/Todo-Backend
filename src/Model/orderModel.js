const Model = require('../Config/dbConnection');

class Order extends Model {
    static get tableName() {
        return 'orders'
    }
    static get idColumn() {
        return 'id'
    }
} 

module.exports = Order