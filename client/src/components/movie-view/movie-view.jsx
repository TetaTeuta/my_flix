import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Link } from "react-router-dom";
import Media from 'react-bootstrap/Media';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    };

    render() {
        const { movie, user } = this.props;

        if (!movie) return null;

        function handleSubmit(event) {
            event.preventDefault();
            axios.post(`https://my-flix-teuta.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
                Username: localStorage.getItem('user')
            }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(response => {
                    console.log(response);
                    alert('Movie has been added to your Favorite List!');
                })
                .catch(event => {
                    console.log('error adding movie to list');
                    alert('Ooooops... Something went wrong!');
                });
        };


        return (
            <div className="movie-view" style={{ width: '20rem', margin: '10%' }}>


                <Media className="d-flex flex-column flex-md-row align-items-center">
                    <Media.Body>
                        <h4 className="value"> {movie.Title} </h4>
                        <p className="value, text-center">{movie.Description}</p>
                        <div className="movie-genre">
                            <h4 className="label">Genre:</h4>
                            <div className="value">{movie.Genre.Name}</div>
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button className="more-button" variant="link">More about this genre</Button>
                            </Link>
                        </div>
                        <div className="movie-director" >
                            <h4 className="label">Director:</h4>
                            <div className="value">{movie.Director.Name}</div>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button className="more-button" variant="link" size="md">More about director</Button>
                            </Link>

                        </div>
                        <Button variant="secondary" size="md" style={{ width: '20rem', margin: '5px' }} onClick={event => handleSubmit(event)}> Add to Favourites </Button>
                        <Link to={`/`}>
                            <Button variant="secondary" size="md" style={{ width: '20rem', margin: '5px' }}>Back</Button>
                        </Link>
                    </Media.Body>
                    <img className="movie-poster" width={64} height={64} className="ml-3" src={movie.ImagePath} />
                </Media>

            </div >
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImageUrl: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.exact({
            _id: PropTypes.string,
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string
        })
    })
};