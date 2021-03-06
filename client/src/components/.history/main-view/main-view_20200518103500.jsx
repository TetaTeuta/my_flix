import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';

import './main-view.scss';

import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';
import { RegistrationView } from '../registration-view/registration-view';
import MoviesList from '../movies-list/movies-list';
import { setMovies } from '../../actions/actions';


export class MainView extends React.Component {

  constructor() {
    super();

    // const store = useStore()

    this.state = {
      // movies: [],
      user: null,
      email: '',
      birthday: '',
      userInfo: {}
    };


  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: accessToken
      });
      this.getMovies(accessToken);
    }

  }

  onMovieClick = (movie) => {
    this.setState({
      selectedMovie: movie
    });
  }

  onFilterChange = (event) => {
    this.setState({
      filterString: event.target.value
    });
  }

  /**
    * Information sent to post from login-view
    * @function onLoggedIn
    * @param {object} authData 
    * @returns {localStorage}
    * @returns {state}
    */

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /**
       * Once the logout is triggered, the local storage is removed and the login page is rendered.
       * @function onLogout
       * @param user
       * @returns {state} 
       */
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  /**
  * When the user has logged in, the list of available movies is rendered
  * @async
  * @function getMovies
  * @param {number} token 
  * @returns {array} movie list
  */

  getMovies(token) {
    axios.get('https://my-flix-teuta.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        // this.setState({ movies: response.data });
        this.props.setMovies(response.data);
        localStorage.setItem('movies', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
       * Get user profile data
       * @function getUser
       * @param {string} user
       * @param {string} token 
       * @returns {object} user information
       */

  getUser(token) {
    axios
      .get('https://my-flix-teuta.herokuapp.com/users/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoggedUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.Username);
  }


  render() {

    let { movies } = this.props;
    let { user, filterString, userInfo, token } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">

        <Row >
          <Link to={`/users/${user}`}>
            <Button className="btn btn-dark" style={{ margin: '2rem' }}>
              Profile</Button>
          </Link>

          <Button className="btn btn-dark" style={{ margin: '2rem' }} onClick={() => this.onLoggedOut()} >
            Log out </Button>
        </Row>
        <Container className="main-view" fluid="true">
          <div>
            <Row className="container-fluid d-flex justify-content-center">

              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MoviesList movies={movies} />;
              }} />

              <Route path="/client/register" render={() => <RegistrationView />} />

              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
              <Route path="/directors/:name" render={({ match }) => {
                if (!movies || !movies.length) return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }
              } />

              <Route path="/genres/:name" render={({ match }) => {
                if (!movies || !movies.length) return <div className="main-view" />;
                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
              }
              } />
              <Route path="/users/:Username" render={({ match }) => { return <ProfileView userInfo={userInfo} /> }} />
              <Route path="/update/:Username" render={() => <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} />} />

            </Row>

          </div>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);

MainView.propTypes = {
  dispatch: propTypes.func
};