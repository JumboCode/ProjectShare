import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AboutPage from './AboutPage';
import Navigation from './Navigation';

// eslint-disable-next-line react/prefer-stateless-function
class AppRouter extends React.Component {
  render(){
    return ( 
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Navigation} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

