const jwt = require('jsonwebtoken')
const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const authenticate = require("../middleware/authenticate")


require('../db/conn');
const User = require("../model/userSchema");


router.use(express.json());
router.use(express.urlencoded({extended:false}))

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { name, email, number, destination, hotel, decorators, designers, photographers, makeup, Events, message, password, cpassword } = req.body;
    // if ( name, email, number, destination, hotel, decorators, designers, photographers, makeup, Events, message, password, cpassword ) {
    //     return res.status(422).json({ error: "Plz filled the field properly" });
    // }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.redirect("/Error.html");
        }
        const user = new User({ name, email, number, destination, hotel, decorators, designers, photographers, makeup, Events, message, password, cpassword });
        // yaha pe
        await user.save();

        res.redirect("/index.html");

    } catch (err) {
        res.redirect("/Error.html");

    }
   
});

router.post('/signin', async (req, res) => {
    //  console.log(req.body);
    //  res.json({message: "awesome"});
    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // return res.status(400).json({ error: "Plz Filled the data" })
            res.redirect("/Error.html");
        }
        const userLogin = await User.findOne({ email : email })
        

        if (userLogin) {
        
        const isMatch = await bcrypt.compare(password, userLogin.password)

        const token = await userLogin.generateAuthToken();
        // console.log(token)


        res.cookie("jwtoken", token, {
            expires: new Date(Date.now()+ 25892000000),
            httpOnly:true
        });

        if (!isMatch) {
            
            // res.status(400).json({error: "password not matched"});
            res.redirect("/Error.html");
        } else {
            // res.json({message: "user signin successfully pswd"});
            res.redirect("/home.html");
            
        }
    }  else {
        // res.status(400).json({message: "Inalid credientials"});
        res.redirect("/Error.html");
        
    }


    } catch (err) {
        console.log(err);
    }
    
});

//  about us ka page 
router.get('/about', authenticate , (req, res) => {    
    // res.send(`Hello world About from the server`);
    console.log(`Hello world About from the server`);
    res.send(req.rootUser);

}) ;


module.exports = router;