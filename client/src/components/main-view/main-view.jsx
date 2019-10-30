import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import { BrowserRouter as Router, Route } from "react-router-dom";
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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
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

    // onLoggedIn(user) {
    //     this.setState({
    //         user
    //     });
    // }


    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
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
        // if (!movies) return <div className="loader">Loading...</div>;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                    <Route path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    }
                    } />

                </div>
            </Router>
        );
    }
}

MainView.propTypes = {
    // will add it later 
};