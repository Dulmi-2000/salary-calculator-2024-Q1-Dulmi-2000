// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const bodyParser = require('body-parser');

const app = express();

// App middleware
app.use(bodyParser.json());
app.use(cors());

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});




// // Database connection
// const DB_URL = 'mongodb+srv://dulmi:dulmi123456@salarycalculatorapp.2qngz5c.mongodb.net/?retryWrites=true&w=majority&appName=salaryCalculatorApp';

// mongoose.connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log('DB connected');
//     })
//     .catch((err) => {
//         console.log('DB connection error:', err);
//     });




// // Save or update form data
// app.post('/api/save-data', (req, res) => {
//     const formData = req.body;
//     FormData.findOneAndUpdate(
//         { userId: formData.userId },
//         formData,
//         { new: true, upsert: true, setDefaultsOnInsert: true }
//     )
//     .then(() => {
//         res.status(201).send('Form data saved successfully');
//     })
//     .catch(err => {
//         res.status(500).send('Error saving form data: ' + err);
//     });
// });


// // Retrieve form data
// app.get('/api/get-data', (req, res) => {
//     FormData.find()
//       .then((data) => {
//         res.status(200).json(data);
//       })
//       .catch(err => {
//         res.status(500).send('Error retrieving form data: ' + err);
//       });
// });