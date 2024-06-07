import { Schema, model } from 'mongoose';

const formDataSchema = new Schema({
    // Unique identifier for each user
    userId: { type: String, required: true, unique: true },
    // Basic salary of the user
    basicSalary: Number,
    // Array of objects representing earnings with title and amount
    earnings: [{ title: String, amount: Number, epfEtf: Boolean }],
    // Array of objects representing deductions with title and amount
    deductions: [{ title: String, amount: Number }]
});

const FormData = model('FormData', formDataSchema);

export default FormData;
