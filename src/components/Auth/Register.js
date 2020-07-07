import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase.js';


const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: []
  });

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(user)) {
      error = { message: 'Fill in all fields' };
      setUser({ errors: errors.concat(error) });
      return false;
    } else if (!isPasswordValid(user)) {
      // throw error
      error = { message: 'Password is invalid.'};
      setUser({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    };
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    };
  };

  const displayErrors = errors => {
    errors.map((error, i) => <p key={i}>{error.message}</p>)
  }

  const handleChange = (e) => {
    console.log("handle change");
    console.log(e.target.name)
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
    console.log(user)
  };

  const handleSubmit = (e) => {
    if (isFormValid()) {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for NewSlack
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="username"
              onChange={handleChange}
              value={user.username}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={user.email}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
              type="password"
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={user.passwordConfirmation}
              type="password"
            />

            <Button color='orange' fluid size='large'>Submit</Button>
          </Segment>
        </Form>
        {user.errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {user.errors.map((error, i) => <p key={i}>{error.message}</p> )}
            {/* {displayErrors(user.errors)} */}
          </Message>
        )}
        <Message>Already a user? <Link to='/login'>Login</Link></Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;