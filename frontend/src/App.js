import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     
        <h1> testing h1 </h1> 
        <h2>testing h2 </h2>
        <h3> testing h3 </h3>
        <h4> testing h4 </h4>
        <caption> testing caption </caption>
        <body> testing body </body>
        <h1> another h1??? </h1>
        <h2> another h2?? </h2>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}  
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}



export default App;

