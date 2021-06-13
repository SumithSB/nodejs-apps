const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/sumith", { useUnifiedTopology: true, useNewUrlParser: true }, function(error) {
    if (!error) {
        console.log("Success, Connected to database");
    } else {
        console.log("Error in connection to database");
    }
});

var users = require('./usersModel');