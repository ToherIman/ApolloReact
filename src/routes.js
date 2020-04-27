import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUp from './pages/signup';
import Login from './pages/login';
import Layout from './pages/layout';
import Verified from './pages/verified';
import Restore from './pages/restore';
import Password from './pages/password';

export default function Auth() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/restore">
            <Restore />
          </Route>
          <Route path="/password">
            <Password />
          </Route>
          <Route path="/verify">
            <Verified />
          </Route>
          <PrivateRoute path="/">
            <Layout />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}


function PrivateRoute({ children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



