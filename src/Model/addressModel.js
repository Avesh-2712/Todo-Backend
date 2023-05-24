const Model = require('../Config/dbConnection');


class Address extends Model {
    static get tableName() {
        return 'address'
    } 
    static get idColumn() {
        return 'id'
    };
};

module.exports = Address