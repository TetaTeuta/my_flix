import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'


import { Link } from "react-router-dom";
import { ProfileUpdate } from '../profile-view/profile-update';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            userData: null,
            FavoriteMovies: []
        };
    }



    componentDidMount() {
        //authentication
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://my-flix-teuta.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                response.data = response.data[0]
                this.setState({
                    userData: response.data,
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteMovieFromFavs(event, favoriteMovie) {
        event.preventDefault();
        axios.delete(`https://my-flix-teuta.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favoriteMovie}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                this.getUser(localStorage.getItem('token'));
            })
            .catch(event => {
                alert('Oops... something went wrong...');
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        const { username, email, birthday, FavoriteMovies } = this.state;
        const movies = JSON.parse(localStorage.getItem(movies));

        return (
            <Card className="profile-view" style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title className="profile-title">My Profile</Card.Title>
                    <ListGroup className="list-group-flush" variant="flush">
                        <ListGroup.Item>Username: {username}</ListGroup.Item>
                        <ListGroup.Item>Password:******* </ListGroup.Item>
                        <ListGroup.Item>Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Birthday: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                        <ListGroup.Item>Favorite Movies:
                          <div className="favs-block">
                                {FavoriteMovies.length === 0 &&
                                    <div className="value">Nothing has been added!</div>
                                }
                                {FavoriteMovies.length > 0 &&
                                    <ul>
                                        {FavoriteMovies.map(favoriteMovie =>
                                            (<li key={favoriteMovie}>
                                                {JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === favoriteMovie).Title}
                                                <Button variant="link" onClick={(event) => this.deleteMovieFromFavs(event, favoriteMovie)}>Delete movie</Button>
                                            </li>)
                                        )}
                                    </ul>
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="text-center">
                        <Link to={`/`}>
                            <Button className="btn btn-dark" style={{ margin: '1rem' }}>Back</Button>
                        </Link>
                        <Link to={`/update/${username}`}>
                            <Button className="btn btn-dark" style={{ margin: '1rem' }}>Update profile</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}