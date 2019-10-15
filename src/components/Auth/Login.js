import React, { useState } from "react";
import firebase from "../../firebase";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleChange = (event, field) => {
    if (field === "email") {
      setEmail(event.target.value);
    } else if (field === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors([]);
    if (isFormValid(email, password)) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.log(err);
          setErrors(errors.concat(err));
          setLoading(false);
        })
    }
  };

  const isFormValid = (email, password) => email && password;

  const handleInputErrors = field => {
    return errors.some(error => error.message.toLowerCase().includes(field))
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to LDSlack
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="violet"
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
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
