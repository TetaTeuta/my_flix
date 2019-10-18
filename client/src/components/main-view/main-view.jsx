import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null
        };
    }

    componentDidMount() {
        // let url_root = 'http://localhost:3000'
        let url_root = 'https://my-flix-teuta.herokuapp.com'
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


    render() {
        const { movies, selectedMovie } = this.state;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={this.onMovieClick} />))
                }
            </div>
        );
    }
}