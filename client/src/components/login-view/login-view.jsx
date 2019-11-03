import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from './logo.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Route } from "react-router-dom";


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://my-flix-teuta.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Container>
            <Router>
                <Row className="justify-content-center">
                    <Col xs={11} sm={8} md={6} className="form-container">
                        <img className="logo" src={Logo} alt="website logo" />
                        <Form className="login-form, col-6" style={{ width: '20rem', margin: '10%' }}>
                            <Form.Label>
                                Username:
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Label>
                            <Form.Label>
                                Password:
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Label>
                            <Link to={`/`}>
                                <button className="login-button, btn-sm" type="button" style={{ width: '20rem', margin: '10%' }} onClick={handleSubmit}>Log in</button>
                            </Link>
                        </Form>
                        <Link to={`/register`}>
                        <Button className="btn-register" variant="secondary">Not a member yet?</Button>
                        </Link>
                    </Col>
                </Row>

            </Router>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};