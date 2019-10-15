// Import express
let express = require('express')
var cors = require('cors');
// Initialize the app
let app = express();
app.use(cors({
     origin: '*'
   }));

// Import Mongo
let db = require('./mongoconnect');
// Import routes
let apiRoutes = require("./view/api-routes")
// Import Body parser
let bodyParser = require('body-parser');

// Setup server port
var port = process.env.PORT || 8081;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
     extended: true
  }));
app.use(bodyParser.json());
// Use Api routes in the App
app.use('/writer', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});