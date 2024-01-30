// create mongoose connection
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema with username requirements
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

// model exercise schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;