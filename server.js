const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/sampleData");


const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const routes = require('./routes/routes');

const port= 30001;

app.use(session({
    secret: 'rithas',
    resave: false,
    saveUninitialized: true,
}));
app.use((req,res,next)=>{
    res.set('Cache-control','no-store,no-cache')
    next()
})


  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'styles')));

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',routes);


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})