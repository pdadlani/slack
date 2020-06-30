import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

ReactDOM.render(
    <Root/>,
  document.getElementById("root")
);
