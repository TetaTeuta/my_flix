import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(username);
    };

    return (
        <div className="registration-view">
            <Row className="justify-content-center">
                <Col xs={11} sm={8} md={6} className="form-container">
                    <Form onSubmit={handleSubmit}>
                        {formField('Name', name, setName)}
                        {formField('Username', username, setUsername)}
                        {formField('Password', password, setPassword, 'password')}
                        {formField('Email', email, setEmail, 'email', 'Please provide a valid email address.')}
                        {formField('Birthday', birthday, setBirthday, 'date', 'Please provide a valid date (e.g. 01/01/1970).')}

                        <Button variant="primary" type="submit">
                            Submit
                </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

RegistrationView.propTypes = {
    onNewUserRegistered: PropTypes.func.isRequired
};