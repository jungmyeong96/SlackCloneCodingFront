import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import LogIn from '../src/LogIn/index';
import SignUp from '../src/SignUp/index';

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default App;
