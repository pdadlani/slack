import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import firebase from './firebase';

import 'semantic-ui-css/semantic.min.css';

function Root(props) {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.history.push("/");
      }
    })
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
} 

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>,
  document.getElementById("root")
);
