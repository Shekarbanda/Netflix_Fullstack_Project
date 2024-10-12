const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const user = require('./Database/db.js');
const dbConnection = require('./utils/Connection.js');
const router = require('./routes/Routes.js');
const dotenv = require('dotenv');
const { is_login } = require('./Controllers/auth.js');
const cors = require('cors');

const corsOptions = {
    origin: "https://netflix-1cu3.onrender.com",
    credentials:true
}
app.use(cors(corsOptions))

dotenv.config({
    path:'.env'
})

const port = process.env.PORT || 4000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

dbConnection();

app.get('/',async (req,res)=>{
    is_login(req,res);
})

app.use("/api",router);


app.get('/api/logout',(req,res)=>{
     try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: true, 
            sameSite: 'None',
             expires: new Date(0)
        });
        
        res.status(200).json({
            message: 'Logged out successfully',
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Logout failed',
            success: false,
            error: err.message,
        });
    }
})

app.delete('/api/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        await movieHistory.deleteOne({ imdbID: movieId });
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting movie' });
    }
});



app.listen(port,(err)=>{
    console.log("server started");
})
