import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import './movie-card.scss';

import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';


// import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, FavouriteMovies } = this.props;

        return (
            <Col className="4" lg={true} >

                <Card className="mb-3 mb-sm-4" style={{ width: '14rem', height: '30rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} style={{ maxHeight: '18rem' }} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text className="cardText">{movie.Description}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="info">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func
};