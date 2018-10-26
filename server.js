// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var passport= require('passport');
var session = require('cookie-session');
var bodyParser = require("body-parser");
var env = require('dotenv').load();
var passport = require("./config/passport");

//Setting up Port
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App and Body Parsing Middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Static directory
app.use(express.static("public"));


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
    console.log('Connection to Database Successful');
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

