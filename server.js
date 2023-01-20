const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express');
const userController = require('./controller/userController');
const userRoutes = require('./routes/userRoutes');
const app = express();
const path = require('path');
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




// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static("client/build"));
// }


app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"),
    function (err) {
        res.status(500).send(err)
    })
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server listening");
})