import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Router from './Router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateAuthentication = this.updateAuthentication.bind(this);
    this.state = {
      isAuthenticated: false,
      authToken: ""
    };
  }

  updateAuthentication(isAuthenticated, authToken) {
    this.setState({
      isAuthenticated,
      authToken
    })
  }

  render() {
    const { authToken, isAuthenticated } = this.state;
    return (
      <div className="App">
        <Router updateAuth={this.updateAuthentication} isAuthenticated={isAuthenticated} authToken={authToken} />
      </div>
    );
  }
}

export default App; 

 
