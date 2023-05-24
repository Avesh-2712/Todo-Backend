const Address = require('../Model/addressModel');
const User = require('../Model/userModel');


const addAdress = async (req, res) => {
    const { user_id, address_line1, address_line2, pincode, city, state, country } = req.body;
    const user = await User.query().where('user_id', user_id).first();
    if (!user) {
        res.status(401).send({
            message: 'Invalid userId'
        });
    } else {
        const user_address = await Address.query().insert({
            user_id: user_id,
            address_line1: address_line1,
            address_line2: address_line2,
            pincode: pincode,
            city: city,
            state: state,
            country: country
        });
        if (user_address) {
            res.status(200).send({
                user_address
            });
        } else {
            res.status(403).send({
                message: 'Something went wrong'
            });
        }
    };
};

module.exports = {
    addAdress
}