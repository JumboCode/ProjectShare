import React from 'react';
import './App.css';
import Router from './Router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateAuthentication = this.updateAuthentication.bind(this);
    this.state = {
      isAuthenticated: false
    };
  }

  updateAuthentication(props) {
    this.setState({
      isAuthenticated: props,
    })
  }

  render() {
    return (
      <div className="App">
        <Router updateAuth={this.updateAuthentication} />
      </div>
    );
  }
}

export default App; 

 
