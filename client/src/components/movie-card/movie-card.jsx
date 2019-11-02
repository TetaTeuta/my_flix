import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

import { Link } from "react-router-dom";

// import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="mb-1 mb-sm-2" style={{ width: '16rem', marginLeft: '30%' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func
};