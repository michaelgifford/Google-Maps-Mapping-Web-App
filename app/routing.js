var mongoose = require('mongoose');
var UsrSchema = require('./model.js');

module.exports = function(app) {     
    // GET routes
    app.get('/users', function(req, res){ // Get all user records from database

        var query = UsrSchema.find({}); // Use mongoose user schema to perform search
        query.exec(function(err, users){
            if(err)
                res.send(err); // Respond to query with error if error occurs

            res.json(users); // Respond to query with JSON of all user records if no errors
        });
    });
    // POST Routes
    app.post('/users', function(req, res){ // Post new user into database

        var newUser = new UsrSchema(req.body); // Use mongoose user schema to create new user

        newUser.save(function(err){ // Save new user to database
            if(err)
                res.send(err); // Respond to query with error if error occurs

            res.json(req.body); // Respond to query with JSON of new user if no errors
        });
    });
}; 