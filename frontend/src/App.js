import React from 'react';
import AboutPage from './AboutPage';
import './App.css';
import Navigation from './Navigation';
import FooterElement from './FooterElement';

function App() {
  return (
    <div className="App">
      <Navigation> </Navigation>
      <AboutPage> </AboutPage>
      <FooterElement> </FooterElement>
    </div>
  );
}

export default App;
