import React from 'react';
import './App.css';
import Navigation from './Navigation';
import FooterElement from './FooterElement';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <Navigation> </Navigation>
      <FooterElement> </FooterElement>
      <Post />
    </div>
  );
}

export default App;
