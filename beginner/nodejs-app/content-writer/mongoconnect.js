// Import Mongoose
let mongoose = require('mongoose');
let ENV = require('./env');
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://'+ENV.MONGO_HOST+':'+ENV.MONGO_PORT+'/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

console.log("Connecting mongo...")

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

module.exports = db;
