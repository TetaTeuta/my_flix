import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';



// import { Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card className="mb-1 mb-sm-2" style={{ width: '16rem', marginLeft: '30%' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title style={{ margin: '10%' }}>{movie.Title}</Card.Title>
                    <Card.Text className="mb-1 mb-sm-2" style={{ minWidth: '12rem' }}>{movie.Description}</Card.Text>
                    <Button style={{ width: '20rem', margin: '10%' }} onClick={() => onClick(movie)} variant="link">Open</Button>
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