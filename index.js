    var express = require('express');
    var path = require('path');
    var bodyParser  = require('body-parser');
    var mongoose = require('mongoose');
    var Users = require('./backend/userCtrl.js');
    
    var app = express();

/*-------*/
/*-USING MIDDLEWARE-*/
/*-------*/
//use Mongoose to connect to database "Users" in MongoDB
mongoose.connect('mongodb://localhost:27017/Users');

//use bodyParser for any body parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

    //use static middleware in express to load static page directory
    app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log('I\'m Listening...');
});

/*-------*/
/*-DATABASE INTERACT-*/
/*-------*/
//enable getting & posting with ngResource
app.get('/api/Users', Users.list);
app.post('/api/Users', Users.create);

