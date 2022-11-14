const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'first name is required'] },
    lastName: { type: String, required: [true, 'last name is required'] },
    email: {
        type: String, required: [true, 'email address is required'],
        unique: [true, 'this email address has been used']
    },
    password: { type: String, required: [true, 'password is required'] },
    isAdmin: { type: Boolean, default: false },
    dates: [{ type: Date }]
}
);

module.exports = mongoose.model('User', userSchema);