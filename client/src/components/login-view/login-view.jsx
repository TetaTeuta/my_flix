import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    return (

        <Row className="justify-content-center">
            <Col xs={11} sm={8} md={6} className="form-container">
                <img src="images/logo.jpg" />
                <Form className="login-form, col-6" style={{ width: '20rem', margin: '10%' }}>
                    <Form.Label>
                        Username:
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Label>
                    <Form.Label>
                        Password:
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Label>
                    <button className="submit-button, btn-sm" type="button" style={{ width: '20rem', margin: '10%' }} onClick={handleSubmit}>Submit</button>
                </Form>
            </Col>
        </Row>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};