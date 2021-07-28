const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configuring the database
const dbConfig = require('./db/index.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./routes/route.js')(app)
require('./routes/user-route.js')(app)
// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});