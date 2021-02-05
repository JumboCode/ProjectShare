import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from "./NotFound";
import AboutPage from './AboutPage';
import Navigation from './Navigation';
import IndexPage from './indexPage';
import FooterElement from './FooterElement';
 
function AppRouter() {
 
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
        <FooterElement /> 
      </div>
    </Router>
  );
}

export default AppRouter;

