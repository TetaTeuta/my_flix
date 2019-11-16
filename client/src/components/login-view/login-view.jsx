import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from './logo.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Route } from "react-router-dom";

import './login-view.scss';


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
                <Row>
                    <Col>
                        <h1>MyFlix movie base</h1>
                    </Col>
                </Row>
                <img className="logo, rounded-circle" src={Logo} style={{ width: '11rem', height: '11rem', padding: '10px', margin: '30px' }} alt="website logo" />
                <Row>
                    <Form className="login-form">
                        <Form.Label>
                            Username:
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Label>
                        <Form.Label>
                            Password:
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Label>
                        <Link to={`/`}>
                            <Button className="btn btn-dark" variant="secondary" style={{ width: '10rem', margin: '5px' }} onClick={handleSubmit}>Log in</Button>
                        </Link>
                        <Button className="btn btn-dark" variant="secondary" style={{ width: '10rem', margin: '5px' }} onClick={() => window.location.href = "/register"}>Not a member?</Button>

                    </Form>
                </Row>
                <div className="buttons">
                </div>
            </Router>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};