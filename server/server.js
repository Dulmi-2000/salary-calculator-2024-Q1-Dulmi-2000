const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//import routes
const routes = require('./routes/salaryRoutes');
const bodyParser = require('body-parser');

//app middleware
app.use(bodyParser.json())
app.use(cors());

//route middleware
app.use(routes)

const PORT = 8000;

// Database connection
const DB_URL = 'mongodb+srv://dulmi:dulmi123456@salarycalculatorapp.2qngz5c.mongodb.net/?retryWrites=true&w=majority&appName=salaryCalculatorApp';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('DB connection error:', err);
    });



app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});


