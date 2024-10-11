const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path:'./.env'
})

function dbConnection(){
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
}




<<<<<<< HEAD
module.exports = dbConnection;
=======
module.exports = dbConnection;
>>>>>>> f768f7d106fdd2c833fc3a93812541c5c8b2497c
