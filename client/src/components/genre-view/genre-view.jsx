import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';


import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { genre } = this.props;

        if (!genre) return null;

        return (
            <Card className="mb-1 mb-sm-2" style={{ width: '16rem', marginLeft: '30%' }}>
                <Card.Body>
                    <Card.Title className="genre-name">{genre.Name}</Card.Title>
                    <Card.Text>
                        <br />
                        {genre.Description}
                    </Card.Text>
                    <div className="text-center">
                        <Link to={`/`}>
                            <Button className="back-button" variant="info">Back</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}

GenreView.propTypes = {
    // will add later
};
