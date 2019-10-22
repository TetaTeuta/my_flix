import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view" style={{ width: '20rem', margin: '10%' }}>
                <h1 className="value">{movie.Title}</h1>
                <div className="movie-description">

                    <div className="value">{movie.Description}</div>
                </div>
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-genre">
                    <h4 className="label">Genre:</h4>
                    <div className="value">{movie.Genre.Name}</div>
                </div>
                <div className="movie-director">
                    <h4 className="label">Director:</h4>
                    <div className="value">{movie.Director.Name}</div>

                </div>
                <button className="submit-button, btn-sm" type="button"
                    onClick={() => this.props.movieClick(null)}
                >Back</button>
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
    }).isRequired
};