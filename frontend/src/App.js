import React from 'react';
// import AboutPage from './AboutPage';
import './App.css';
import Navigation from './Navigation';
import FooterElement from './FooterElement';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <Navigation> </Navigation>
      {/* <AboutPage /> */}
      <FooterElement> </FooterElement>
      <Post></Post>
    </div>
  );
}

export default App;
