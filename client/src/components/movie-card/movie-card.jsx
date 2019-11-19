import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import './movie-card.scss';

import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

export class MovieCard extends React.Component {
    render() {
        const { movie, FavouriteMovies } = this.props;

        return (
            <Col lg={true} >

                <Card className="xs=12 md=8 mb-sm-4" style={{ width: '14rem', height: '32rem' }}>
                    <Card.Img className="card-image" variant="top" src={movie.ImagePath} style={{ maxHeight: '18rem' }} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text className="center">{movie.Description}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button className="btn btn-dark" variant="secondary">More</Button>
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