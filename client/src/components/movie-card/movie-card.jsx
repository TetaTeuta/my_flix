import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



// import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card className="mb-1 mb-sm-2" style={{ width: '16rem', marginLeft: '30%' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title className="text-md-center" style={{ margin: '10%' }}>{movie.Title}</Card.Title>
                    <Card.Text className="text-md-center" className="mb-1 mb-sm-2" className="text-md-center" style={{ minWidth: '12rem' }}>{movie.Description}</Card.Text>
                    <Button style={{ width: '20rem', margin: '10%' }} onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};