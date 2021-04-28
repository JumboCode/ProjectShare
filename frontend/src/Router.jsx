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
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import TagPage from './TagPage';
import SearchResultsPage from './SearchResultsPage';
import Post from './Post';
 
function AppRouter() {
 
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/post/:postId" component={Post} />
          <Route path="/category/:categoryId" component={CategoryPage} />
          <Route path="/tag/:tagId" component={TagPage} />
          <Route path="/search" component={SearchResultsPage} />
          <Route component={NotFound} />
        </Switch>
        <FooterElement /> 
      </div>
    </Router>
  );
}

export default AppRouter;

