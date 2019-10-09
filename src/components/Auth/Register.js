import React, { useState } from "react";
import firebase from '../../firebase';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleChange = (event, field) => {
    if (field == 'username') {
      setUsername(event.target.value);
    } else if (field == 'email') {
      setEmail(event.target.value);
    } else if (field == 'password') {
      setPassword(event.target.value);
    } else if (field == 'passwordConfirmation') {
      setPasswordConfirmation(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="green" textAlign="center">
          <Icon name="puzzle piece" color="green" />
          Register for LDSlack
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={event => handleChange(event, "username")}
              value={username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={event => handleChange(event, "email")}
              value={email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={event => handleChange(event, "password")}
              value={password}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={event => handleChange(event, "passwordConfirmation")}
              value={passwordConfirmation}
              type="password"
            />

            <Button color="green" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
