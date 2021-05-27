import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PropTypes from 'prop-types';
import ProtectedRoute from './ProtectedRoute';
import NotFound from "./NotFound";
import LogoutPage from "./LogoutPage";
import AboutPage from './AboutPage';
import Navigation from './Navigation';
import PostComposer from './PostComposer';
import AdminDashboard from './AdminDashboard';
import FooterElement from './FooterElement';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import TagPage from './TagPage';
import SearchResultsPage from './SearchResultsPage';
import Post from './Post';
import LoginSignupPage from './LoginSignupPage';
import ScrollToTop from './ScrollToTop';
import UpdateFeaturedPost from './UpdateFeaturedPost';

function AppRouter({updateAuth, isAuthenticated, authToken }) {
  
  const auth = updateAuth;
 
  return (
    <Router>
      <div>
        <Navigation />
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/post/:postId" component={Post} />
            <Route path="/category/:categoryId" component={CategoryPage} />
            <Route path="/tag/:tagId" component={TagPage} />
            <Route path="/search" component={SearchResultsPage} />
            <Route path="/home" component={HomePage} />
            <Route 
              path="/login" 
              render={() => (
                <LoginSignupPage 
                  updateAuth={auth} 
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route
              path="/logout"
              render={() => (
                <LogoutPage
                  updateAuth={auth}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route path="/post/:postId" component={Post} />
            <ProtectedRoute
              path="/add-post"
              Component={PostComposer}
              isAuthenticated={isAuthenticated}
              authToken={authToken}
            />
            <ProtectedRoute
              path="/edit-post/:postId"
              Component={PostComposer}
              isAuthenticated={isAuthenticated}
              authToken={authToken}
            />
            <ProtectedRoute
              path="/dashboard"
              Component={AdminDashboard}
              isAuthenticated={isAuthenticated} 
              authToken={authToken}
            />
            <ProtectedRoute 
              path="/featured-post"
              Component={UpdateFeaturedPost}
              isAuthenticated={isAuthenticated}
              authToken={authToken} 
            />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
        <FooterElement isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

AppRouter.defaultProps = {
  updateAuth: null,
  authToken: null,
}

AppRouter.propTypes = {
  updateAuth: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  authToken: PropTypes.string,
};

export default AppRouter;

