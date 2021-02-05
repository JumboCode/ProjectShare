import React from 'react';
import AboutPage from './AboutPage';
import './App.css';
import Navigation from './Navigation';
import FooterElement from './FooterElement';
import PostContent from './PostContent';

function App() {
  return (
    <div className="App">
      <Navigation> </Navigation>
      <AboutPage />
      <FooterElement> </FooterElement>
      <PostContent> </PostContent>
    </div>
  );
}

export default App;
