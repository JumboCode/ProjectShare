import React from 'react';
import './HomePage.css';
// import Button from 'react-bootstrap/Button';
// import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostFeed from "./PostFeed";

const topics = ["Access", "Education", "Environment", "Equality", "Food Insecurity", "Gender Equality", "Maternal & Child Health", 
  "Mental Health", "Sharewood Project", "Women's Health", "Vulnerable Groups (at risk)"];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch ("http://localhost:8000/api/posts") 
      .then(res => res.json())
      .then(res => this.setState({posts: res}));
  }
  
  render() {
    const listItems = topics.map((topic) => (
      <li key={topic.toString()}>
        {topic}
      </li>
    )
    );

    const {posts} = this.state 
    return (
      <div className="HomePage">
        <div className="sideBar">
          <div className="sortBy"> 
            <h3 className="sortByHeader"> Sort By </h3>
            <DropdownButton variant="outline-primary" className="mostRecent" title="Most Recent"> 
              <Dropdown.Item> Something </Dropdown.Item>
              <DropdownItem> Something 2</DropdownItem>
            </DropdownButton>
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
            <button type="button" className="helpButton"> Resource Finder </button>
          </div>
        </div>
        <div className="featured">  </div> 
        <div className="postFeed">
          { posts.length > 0 && (
            <PostFeed title="Featured" posts={posts} />
          )}
        </div>
      </div>
    );
  }
}
export default Home;

