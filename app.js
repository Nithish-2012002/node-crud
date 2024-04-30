const express = require("express");
const exphbs=require("express-handlebars");
const bodyparser=require("body-parser");
//const mysql=require("mysql");
require('dotenv').config();


const app=express();
const port=process.env.PORT||5000;
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//static files

app.use(express.static("public"));


//template Engine.

const handlebars=exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

//Mysql
// const conn=mysql.createPool({
//     connectionLimit:10,
//     host:process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_NAME
// });
//checking connection...
// conn.getConnection((err,connection)=>{
//     if(err) throw err
//     console.log("Connection Success: ")
// }); 



//Router

// app.get('/',(req,res)=>{
//     res.render("home");
// });

const routes=require('./server/controllers/routes/students');
app.use('/',routes);


//port listening...
app.listen(port,()=>{
    console.log("Listening at: "+port);
});