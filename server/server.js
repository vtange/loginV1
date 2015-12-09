    var express = require('express');
    var path = require('path');
    var bodyParser  = require('body-parser');
    var mongoose = require('mongoose');
    var Users = require('./userCtrl.js');
    
    var app = express();

/*-------*/
/*-USING MIDDLEWARE-*/
/*-------*/
//use Mongoose to connect to database "votingapp" in MongoDB
mongoose.connect('mongodb://localhost:27017/votingapp');

//use bodyParser for any body parsing
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//use static middleware in express to load static page directory
app.use(express.static(path.join(__dirname, '../client')));

/*-------*/
/*-DATABASE INTERACT-*/
/*-------*/

app.get('/Users', Users.list);//from $resource service
app.post('/Users', Users.create);//from $resource service

/*-------*/
/*-START SERVER-*/
/*-------*/

app.listen(3000,function(){
    console.log('I\'m Listening...');
});