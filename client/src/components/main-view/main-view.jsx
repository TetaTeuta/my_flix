import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();                  //super is mandatory when if it has contructor 

        this.state = {
            movies: null,
            selectedMovie: null
        };
    }

    componentDidMount() {
        axios.get('<https://my-flix-teuta.herokuapp.com/movies>')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    render() {
        const { movies } = this.state;
        if (!movies) return <div classNAme="main-view" />;
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />      //loop over the movies array and return a div for each movie within the array.
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}