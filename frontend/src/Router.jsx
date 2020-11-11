import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AboutPage from './AboutPage';
import Navigation from './Navigation';


class AppRouter extends React.PureComponent {
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

