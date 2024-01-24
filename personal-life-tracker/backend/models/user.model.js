// create mongoose connection
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema with username requirements
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
}, {
    timestamps: true,
});

// model user schema
const User = mongoose.model('User', userSchema);

module.exports = User;