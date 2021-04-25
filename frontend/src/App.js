import React from 'react';
import './App.css';
import Router from './Router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  updateAuth(props) {
    this.setState({
      isAuthenticated: props,
    })
  }

  render() {
    return (
      <div className="App">
        <Router updateAuth={this.updateAuth} />
      </div>
    );
  }
}

export default App; 

 
