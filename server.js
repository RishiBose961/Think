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


const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.listen(port, () => {
    console.log("Server listening");
})