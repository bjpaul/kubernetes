// Import Mongoose
let mongoose = require('mongoose');
let ENV = require('./env');
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
var options = {
    useNewUrlParser:true
  };
  
var mongooseConnectionString = 'mongodb://'+ENV.MONGO_USER+':'+ENV.MONGO_PASSWORD+'@'+ENV.MONGO_HOST+':'+ENV.MONGO_PORT+'/resthub?authSource=admin';
console.log("Connecting mongo...")
mongoose.connect(mongooseConnectionString, options);
var db = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
  db.on('connected', function () {  
    console.log('Connected successfully!!!');
  }); 
  
  // If the connection throws an error
  db.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  db.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {  
    db.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 

