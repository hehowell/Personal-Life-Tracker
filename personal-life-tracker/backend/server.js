
// start instances of express, cors, and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// allow for environment variables in the dotenv file
require('dotenv').config();

// create express server with specified port
const app = express();
const port = process.env.PORT || 3000;

// middlewear allowing for json parsing (send and receive)
app.use(cors());
app.use(express.json());

// create connection to MongoDB via MongoDBAtlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// start listening for the app at given port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 