import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post('https://my-flix-teuta.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
                alert('Something is incorrect')
                console.log('error registering the user')
            });
    };

    return (
        <Form className="registration-form">
            <h4>Register to MyFlix:</h4>
            <Form.Group controlId="formNewUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} />
                <Form.Text className="text-muted">
                    Min 5 characters
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We will not spam you.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formBirthday'>
                <Form.Label>Birthday</Form.Label>
                <Form.Control type='date' placeholder='MM/DD/YYYY' value={birthday} onChange={e => setBirthday(e.target.value)} />
                <Form.Text className="text-muted">
                    Optional
              </Form.Text>
            </Form.Group>
            <div className="text-center">
                <Button variant="secondary" size="md" style={{ width: '20rem', margin: '5px' }} onClick={handleRegister} >
                    Register

          </Button>
                <Link to={`/`}>
                    <Button variant="secondary" size="md" style={{ width: '20rem', margin: '5px' }}>Back</Button>
                </Link>
            </div>

        </Form >
    );
};

RegistrationView.propTypes = {
    onNewUserRegistered: PropTypes.func
};