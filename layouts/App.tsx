import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Channel from '../src/pages/Channel/index';
import LogIn from '../src/pages/LogIn/index';
import SignUp from '../src/pages/SignUp/index';

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/channel" component={Channel} />
    </Switch>
  );
};

export default App;
