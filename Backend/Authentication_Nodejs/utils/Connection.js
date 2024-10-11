const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path:'./.env'
})

function dbConnection(){
mongoose.connect(process.env.DB_URI).then(console.log("db connected")).catch((err)=>{
    console.log(err);
});
}

module.exports = dbConnection;