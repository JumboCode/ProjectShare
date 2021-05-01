import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import PostFeed from "./PostFeed";
import './PostFeedPage.css';

const topics = ["Access", "Education", "Environment", "Equality", "Food Insecurity", "Gender Equality", "Maternal & Child Health", 
  "Mental Health", "Sharewood Project", "Women's Health", "Vulnerable Groups (at risk)"];

class PostFeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }
  
  componentDidMount() {
    const {fetchEndpoint} = this.props
    fetch (fetchEndpoint) 
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
    const {featured,title, subtitle} = this.props
    const {posts} = this.state

    return (
      <div className="postfeedPage">
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
        <div className="postfeedFormat">
          <PostFeed posts={posts} featured={featured} subtitle={subtitle} title={title} />
        </div>
      </div>
    );
  }
}
export default PostFeedPage;

PostFeedPage.defaultProps = {
  featured: false,
  title: "",
  subtitle: "",
};
  
PostFeedPage.propTypes = {
  title: PropTypes.string,
  fetchEndpoint: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  featured: PropTypes.bool,
};