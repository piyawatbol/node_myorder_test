var express = require('express');
require("dotenv").config();
require("./config/database").connect();
var app = express();
const {API_PORT} = process.env;
app.use(express.json())
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/',(req,res)=>{
    res.send("hello")
})


app.use('/user',require('./routes/users/users.js'))



app.listen(API_PORT, ()=>{
    console.log(`Api Listening on PORT ${API_PORT}`);
})

module.exports = app