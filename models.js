const mongoose = require('mongoose');


var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
});

userSchema.statics.hashPassword = function (password) {
  console.log('got this far')
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password, console.log(password + "====" + this.Password));

};


var Movie = mongoose.model('Movie', movieSchema, 'Movies');  //this creates db.movies somewhere else
var User = mongoose.model('User', userSchema, 'Users');

module.exports.Movie = Movie;    //this exports modules
module.exports.User = User;    //if specify user will create users



