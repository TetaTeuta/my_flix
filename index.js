const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const uuid = require ('uuid');

const app = express();


app.use(bodyParser.json());


let topMovies = [ {
    title : 'The League of Extraordinary Gentlemen',
    director : 'Stephen Norrington'
},
{
    title : 'Lord of the Rings',
    author : 'J.R.R. Tolkien'
},
{
    title : 'Twilight',
    author : 'Stephanie Meyer'
},
{
    title :  'Mamma Mia',
    author : 'Phyllida Lloyd'
},
{
    title :  'Mamma Mia 2',
    author : 'Phyllida Lloyd'
},
{
    title :  'The Godfather',
    author : 'Francis Ford Coppola'
},
{
    title :  'P.S. I Love You',
    author : 'Richard LaGravenese'
},
{
    title :  'The Godfather',
    author : 'Francis Ford Coppola'
},
{
    title :  'The Curious Case of Benjamin Button',
    author : 'David Fincher'
},
{
    title :  'Blue Is the Warmest Colour',
    author : 'Abdellatif Kechiche'
}]


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

// Gets the list of data about all movies 
app.get('/movies', function(req, res) {
    res.json(topMovies)
  });


// Gets the data about a single movie by name
app.get("/movies/:title", (req, res) => {
    res.json(topMovies.find( (movie) => 
      { return movie.title === req.params.title }));  //req.params returns a JS object after the query string is parsed
  });
  
  // Gets the data about genre by name
  app.get("/genre/:Genre", (req, res) => {
    res.json(topMovies.find( (movie) => 
      { return movie.Genre === req.params.Genre }));     
  });
  
  // Gets the data about director by name
  app.get("/director/:Director", (req, res) => {
    res.json(topMovies.find( (movie) => 
      { return movie.Director === req.params.Director }));   
  });

//POST

// Adds data for a new movie to list of movies
app.post("/movies", (req, res) => {
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
  app.post('/user', (req, res) => {
    res.send('Successful POST request returning data about user registration');
  });

  //Allow users to add a movie to their list of favorites
  app.post("/favorites/:Username/movies/:MovieID", (req, res) => {
    res.send('Successful POST request returning data about favourite list');
});


//PUT

app.put("/users/:Username", (req, res) => {
    res.send('Successful PUT request returning data about new users');
});

//DELETE

//deletes the movie from users favourites list 
app.delete('/favorites/:Username/Movies/:MovieID', (req, res) => {
    res.send('Movie deleted from favourites');
});


//deletes the user from registry 
app.delete('/users/:Username', (req, res) => {
    res.send('user deleted from registry');
});


// listen for requests
app.listen(3000, () =>
console.log('Server is listening on port 3000')
);

