import React from 'react';
import './HomePage.css';

const topics = ["Access", "Education", "Environment", "Equality", "Food Insecurity", "Gender Equality", "Maternal & Child Health", 
  "Mental Health", "Sharewood Project", "Women's Health", "Vulnerable Groups (at risk)"];

function Home(){

  const listItems = topics.map((topic) => (
    <li key={topic.toString()}>
      {topic}
    </li>
  )
  );
  return (
    <>
      <div className="sortBy"> 
        <h3 className="sortByHeader"> Sort By </h3>
        <button type="button" className="mostRecent"> 
          Most Recent
          <i className="arrow down"> </i> 
        </button>
      </div>
      <div className="topicList"> 
        <h3 className="filters">
          Filters
        </h3>
        <ul className="filterList">
          {listItems} 
        </ul>
      </div>
      <div className="needHelp">  
        <h3 className="helpHeader"> Need Help? </h3>
        <p className="helpParagraph"> Use our resource finder to find the information you are looking for. </p>
        <button className="helpButton" type="button"> Resource Finder </button>
      </div>
      <div className="featured">  </div>
    </>
  );
}
export default Home;

