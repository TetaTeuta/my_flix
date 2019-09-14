const express = require ('express');
const morgan = require ('morgan');
const app = express();



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
app.use('/documentation.html', express.static('public'));
app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});

// GET requests
app.get('/', function(req, res) {
    res.send('Welcome to my movie app!')
  });

app.get('/movies', function(req, res) {
    res.json(topMovies)
  });

//   app.use(function(req, res){
//     res.status(404).send('Under construction');
// });


// listen for requests
app.listen(3000, () =>
console.log('Checking if the code is working')
);

