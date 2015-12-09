    var express = require('express');
    var path = require('path');
    var bodyParser  = require('body-parser');
    var mongoose = require('mongoose');
    var Users = require('./userCtrl.js');
    
console.log("start app")

    var app = express();

/*-------*/
/*-USING MIDDLEWARE-*/
/*-------*/
//use Mongoose to connect to database "votingapp" in MongoDB
console.log("connect mongoose")
mongoose.connect('mongodb://localhost:27017/votingapp');

console.log("use Bodyparser")
//use bodyParser for any body parsing
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
console.log("use static files")
//use static middleware in express to load static page directory
app.use(express.static(path.join(__dirname, '../client')));

/*-------*/
/*-DATABASE INTERACT-*/
/*-------*/
console.log("setting up Port...")
app.get('/Users', Users.list);//from $resource service
app.post('/Users', Users.create);//from $resource service

/*-------*/
/*-START SERVER-*/
/*-------*/
console.log("begin listen")
app.listen(process.env.PORT, process.env.IP,function(){
    console.log('I\'m Listening...');
});