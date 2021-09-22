import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../Homepage';
import Contact from '../Contact';
import About from '../About';
import Legals from '../Legals';
import Criteria from '../Criteria';
import Results from '../Results';
import Details from '../Details';
import Connexion from '../Connexion';
import Account from '../Account';
import Inscription from '../Inscription';

import './index.scss';
import NewPassword from '../NewPassword';

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Homepage />
    </Route>
    <Route path="/contact" exact>
      <Contact />
    </Route>
    <Route path="/about" exact>
      <About />
    </Route>
    <Route path="/legals" exact>
      <Legals />
    </Route>
    <Route path="/criteria" exact>
      <Criteria />
    </Route>
    <Route path="/results" exact>
      <Results />
    </Route>
    <Route path="/details" exact>
      <Details />
    </Route>
    <Route path="/connexion" exact>
      <Connexion />
    </Route>
    <Route path="/account" exact>
      <Account />
    </Route>
    <Route path="/inscription" exact>
      <Inscription />
    </Route>
    <Route path="/newpassword" exact>
      <NewPassword />
    </Route>
  </Switch>
);

export default App;
