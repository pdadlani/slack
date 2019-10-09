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
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    let error;
    if (isFormEmpty(username, email, password, passwordConfirmation)) {
      error = { message: "You need to provide all fields."};
      setErrors(errors => errors.concat(error));
      return false;
    } else if (!isPasswordValid(password, passwordConfirmation)) {
      error = { message: "Password is invalid"};
      setErrors(errors => errors.concat(error));
      return false;
    } else {
      return true;
    }
  }

  const isFormEmpty = (username, email, password, passwordConfirmation) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  const isPasswordValid = (password, passwordConfirmation) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  const displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  const handleChange = (event, field) => {
    if (field === 'username') {
      setUsername(event.target.value);
    } else if (field === 'email') {
      setEmail(event.target.value);
    } else if (field === 'password') {
      setPassword(event.target.value);
    } else if (field === 'passwordConfirmation') {
      setPasswordConfirmation(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          console.log(createdUser);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setErrors(errors.concat(err));
        });
    }
  }

  const handleInputErrors = field => {
    return errors.some(error => error.message.toLowerCase().includes(field)) ? "error" : ""
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
              className={handleInputErrors("username")}
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
              className={handleInputErrors("email")}
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
              className={handleInputErrors("password")}
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
              className={handleInputErrors("passwordConfirmation")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="green"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
