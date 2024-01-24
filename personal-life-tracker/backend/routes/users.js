// access the express router and user file path
const router = require('express').Router();
let User = require('../models/user.model');

// get request, uses .find() to get all users and return in JSON format
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post request, creates new user instance based on req and saves to db
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// export the router
module.exports = router;