const dotenv = require("dotenv")
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const path = require("path")

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// Middleware

// const middleware = (req,res,next) => {
//     console.log('Hello my Middleware');
//     next();
// }

const static_path = path.join(__dirname, "./public")
app.use(express.static(static_path))
app.use(express.urlencoded({extended:false}))




app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`);
})