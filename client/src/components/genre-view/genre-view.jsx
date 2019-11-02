import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        return (

            <div className="genre-description">
                <h4 className="label">Genre:</h4>
                {/* <div className="description">{movie.Genre}</div> */}



                <Link to={`/`}>
                    <Button className="back-button, btn-sm" variant="link" style={{ width: '40rem', margin: '10%' }} >Back</Button>
                </Link>
            </div>
        )
    };

}

GenreView.propTypes = {
    // will add later
};
