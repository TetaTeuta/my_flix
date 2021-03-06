const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const { check, validationResult } = require('express-validator');

const app = express();

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true}, function(){
//   console.log('mongodb connected')
// });

mongoose.connect(
  'mongodb+srv://Teveta100:Motori2812@myflixdb-tr84f.mongodb.net/myFlixDB?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

var allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://my-flix-teuta.herokuapp.com', 'http://localhost:1234'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

//passport authorization in auth.js file
var auth = require('./auth')(app);


app.use(morgan('common'));
app.use('/public', express.static(path.resolve(__dirname, '../public/dist')));
app.use('/client', express.static(path.join(__dirname, 'client', 'dist')));
app.get('/client/*', (req, res) => {
  if (req.is('application/*')) {
    res.set('Content-Type', 'application/javascript');
  }
  if (req.is('text/css')) {
    res.set('Content-Type', 'text/css');
  }
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(function (err, req, res, next) {
  console.error(err.stack); // err.stack is default error-handling middleware function
  res.status(500).send('Something broke!');
  next();
});


// GET requests
app.get('/', function (req, res) {
  res.send('Welcome to my movie app!')
});

//get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function (req, res) {

  Movies.find()
    .then(function (movies) {
      res.status(200).json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


//get movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// Gets the movies with same genere by genre name
app.get("/genre/:Name", passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies.Genre)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// Gets the movies from single director by name
app.get("/directors/:Name", passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function (directors) {
      res.json(directors.Director)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get('/users/:Username', function (req, res) {
  Users.find({ Username: req.params.Username })
    .then(function (user) {
      res.json(user)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//POST

// Adds data for a new movie to list of movies
app.post("/movies", passport.authenticate('jwt', { session: false }), (req, res) => {
  let newMovie = req.body;   //req.body holds parameters that are sent up from the client as part of a POST request

  if (!newMovie.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();  //uuid.v4() assignes ID number by default 
    topMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//creating new user
app.post('/users', [check('Username', 'Username is required').isLength({ min: 5 }),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail()], (req, res) => {

  // check the validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then(function (user) {
      if (user) {
        //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then(function (user) { res.status(201).json(user) })
          .catch(function (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    }).catch(function (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});


//PUT

//update users info by username
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), [

  check('Username').isAlphanumeric(),
  check('Password').isLength({ min: 5 }),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {
  // check validation object for errors
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json({ errors: errors.array });
  }


  var hashedPassword = Users.hashPassword(req.body.Password
  );

  Users.findOneAndUpdate({
    Username: req.params.Username
  }, {
      $set:
      {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday

      }
    },
    { new: true }, //This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser)
      }
    })
});

//DELETE

//deletes the movie from users favourites list 
app.delete("/users/:Username/Movies/:MovieID", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }, // This line makes sure that the updated document is returned
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//deletes the user from registry 
app.delete('/users/:Username', function (req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on all ports");
});

