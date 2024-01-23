
// start instances of express and cors
const express = require('express');
const cors = require('cors');

// allow for environment variables in the dotenv file
require('dotenv').config();

// create express server with specified port
const app = express();
const port = process.env.PORT || 5000;

// middlewear allowing for json parsing (send and receive)
app.use(cors());
app.use(express.json());

// start listening for the app at given port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 