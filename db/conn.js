const mongoose = require('mongoose')
// const DB = process.env.Database;

mongoose.connect("mongodb://localhost:27017/newtth").then(()=> {
    console.log(`connection successful`);
}).catch((err) => console.log(`no connection`));


