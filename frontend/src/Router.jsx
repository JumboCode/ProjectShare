import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PropTypes from 'prop-types';
import NotFound from "./NotFound";
import AboutPage from './AboutPage';
import Navigation from './Navigation';
import IndexPage from './indexPage';
import FooterElement from './FooterElement';
import HomePage from './HomePage';
import Post from './Post';
import LoginSignupPage from './LoginSignupPage';
 
function AppRouter({updateAuth}) {
  
  const auth = updateAuth;
 
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/LoginSignupPage" render={() => <LoginSignupPage updateAuth={auth} />} />
          <Route path="/post/:postId" component={Post} />
          <Route component={NotFound} />
        </Switch>
        <FooterElement /> 
      </div>
    </Router>
  );
}

AppRouter.defaultProps = {
  updateAuth: null,
}

AppRouter.propTypes = {
  updateAuth: PropTypes.func,
};

export default AppRouter;

