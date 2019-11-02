import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from './logo.jpg';
import axios from 'axios';

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
                    <button className="login-button, btn-sm" type="button" style={{ width: '20rem', margin: '10%' }} onClick={handleSubmit}>Submit</button>
                </Form>
            </Col>
        </Row>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};