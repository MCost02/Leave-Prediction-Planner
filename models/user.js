const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'first name is required'] },
    lastName: { type: String, required: [true, 'last name is required'] },
    email: {
        type: String, required: [true, 'email address is required'],
        unique: [true, 'this email address has been used']
    },
    password: { type: String, required: [true, 'password is required'] },
    isAdmin: { type: Boolean, default: false },
}
);

//replace password text with hashed password

//pre middleware
userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));
});

//implement method to compare login password and hash stored in database
userSchema.methods.comparePassword = function (loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}


module.exports = mongoose.model('User', userSchema);

