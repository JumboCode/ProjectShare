import React from 'react';
import List from './HomePageArray';


class Home extends React.Component(){
  render(){
    return (
      <>
        <div className="topicList"> 
          <List />
        </div>
        <div className="featured">  </div>

        <div className="needHelp">  
          <h3> Need Help? </h3>
          <p> Use our resource finder to find the information you are looking for </p>
          <button type="button"> Resource Finder </button>
        </div>
      </>
    );
  }
}

export default Home;


// source: https://reactjs.org/docs/lists-and-keys.html
