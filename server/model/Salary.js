const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique identifier for each user
    basicSalary: Number,
    earnings: [{ title: String, amount: Number }],
    deductions: [{ title: String, amount: Number }]
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
