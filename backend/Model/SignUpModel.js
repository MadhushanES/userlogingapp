const mongoose = require('mongoose');
const validator = require('validator');

const passwordValidator = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(value);
};

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, 'Please enter FirstName']
    },
    UserEmail: {
        type: String,
        required: [true, 'Please enter Email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    UserPassword: {
        type: String,
        required: [true, 'Please enter Password'],
        validate: {
            validator: passwordValidator,
            message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserData', UserSchema);
