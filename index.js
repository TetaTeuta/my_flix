const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const uuid = require ('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const passport = require('passport');
require('./passport');

const app = express();

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true}, function(){
  console.log('mongodb connected')
});



app.use(bodyParser.json());

var auth = require('./auth')(app);


app.use(morgan('common'));
app.use('/documentation.html', express.static(__dirname + '/public'));
app.use(function (err, req, res, next){
    console.error(err.stack);                // err.stack is default error-handling middleware function
    res.status(500).send('Something broke!');
    next();
});

// GET requests
app.get('/', function(req, res) {
    res.send('Welcome to my movie app!')
  });


  //get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {

  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get movie by title
  app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function(req, res) {
    Movies.findOne({ Title : req.params.Title })  
    .then(function(movies) {
      res.json(movies)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);     
    });
  });

  
  // Gets the movies with same genere by genre name
  app.get("/genre/:Name", passport.authenticate('jwt', { session: false }), function(req, res) {
    Movies.findOne({ "Genre.Name" : req.params.Name })  
    .then(function(movies) {
      res.json(movies.Genre)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);     
    });
  });

  
  // Gets the movies from single director by name
  app.get("/directors/:Name", passport.authenticate('jwt', { session: false }), function(req, res) {    
    Movies.findOne({ "Director.Name" : req.params.Name })  
    .then(function(directors) {
      res.json(directors.Director)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);     
    });
  });

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
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


  // new user registration
  app.post('/users', function(req, res) {
    Users.findOne({ Username : req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then(function(user) {res.status(201).json(user) })
        .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });

  //Allow users to add a movie to their list of favorites
  app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username }, {
      $push : { FavoriteMovies : req.params.MovieID }
    },
    { new : true }, 
    function(err, updatedUser) {
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
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, 
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});

//DELETE

//deletes the movie from users favourites list 
app.delete('/favorites/:username/movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res){     //ne radi
  Users.findOneAndRemove ({Favourites: req.params.Title})
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Title + " was not found");
    } else {
      res.status(200).send(req.params.Title + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//deletes the user from registry 
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// listen for requests
app.listen(3000, () =>
console.log('Server is listening on port 3000')
);

