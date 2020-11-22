import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from "./NotFound";
import AboutPage from './AboutPage';
import Navigation from './Navigation';

function AppRouter() {
  return ( 
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;

