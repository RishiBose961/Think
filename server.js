const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
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




app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req,res) {
  res.sendFile(path.join(__dirname,"./client/build.index.html"))
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Server listening");
})