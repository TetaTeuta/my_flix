import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


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


export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
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
                this.setState({ movies: response.data });
                localStorage.setItem('movies', JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
        const { movies, selectedMovie, user, userInfo } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <div className="btn-group">
                        <Link to={`/users/${user}`}>
                            <Button className="profile-btn" variant="info">
                                Profile</Button>
                        </Link>
                        <Button className="logout" variant="info" onClick={() => this.onLoggedOut()} >
                            Log out </Button>
                    </div>
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return movies.map(m => <MovieCard key={m._id} movie={m} />)
                    }
                    } />
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

                </div>
            </Router>
        );
    }
}

MainView.propTypes = {
    // will add it later 
};