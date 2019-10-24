import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        // let url_root = 'http://localhost:3000'
        let url_root = 'https://my-flix-teuta.herokuapp.com'   //good place to instantiate the network request.
        axios.get(`${url_root}/movies`)
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(err => {
                console.log(err);
            });
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


    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://my-flix-teuta.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;

        // Loader
        if (!movies) return <div className="loader">Loading...</div>;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onMovieClick={this.onMovieClick} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={this.onMovieClick} />
                    ))
                }
            </div>
        );
    }
}

MainView.propTypes = {
    // will add it later 
};