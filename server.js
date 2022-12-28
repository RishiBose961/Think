const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express');
const userController = require('./controller/userController');
const userRoutes = require('./routes/userRoutes');
const app = express();
require("dotenv").config();
//Data Base 

mongoose.connect(process.env.MONOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MONGO DataBase Connect Sucessfully');
    }
    else {
        console.log('MONGO DataBase Connect Failed');
    }
})

app.use(express.json());
express.urlencoded({ extended: true })
app.use(cookieParser())

app.use(userRoutes)


const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}


app.listen(port, () => {
    console.log("Server listening");
})