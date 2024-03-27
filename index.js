const express = require('express');
const path=require("path");
const ejs=require('ejs');
const bodyParse=require('body-parser');
const db=require('./db');

const app=express();
const port=3000;
app.use(express.json())
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname,"public")));
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use('/auth',require('./routes/authentication'));


app.get(['/','/home',"/index"],(req,res)=>{
    res.render("index");
})
db().then(()=>{
    console.log("Database was connected");
    app.listen(port,()=> console.log("server connected to: localhost:"+port));
})
.catch(()=>{
    console.log("Server not runnig");
})
