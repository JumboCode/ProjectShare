import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Link} from 'react-router-dom';
import { Map as MapIcon } from 'react-feather';
import PostFeed from "./PostFeed";
import HelpModal from './HelpModal';
import './PostFeedPage.css';
import { BACKEND_URL } from './fetch';
import Map from "./MapboxMap";

class PostFeedPage extends React.Component {
  constructor(props) {
    super(props);
    const { mapDefaultOpen } = this.props;
    this.state = { posts: [], tags: [], sortBy: 'Featured', isMapOpen: mapDefaultOpen};
  }
  
  componentDidMount() {
    const {fetchEndpoint} = this.props
    fetch (fetchEndpoint) 
      .then(res => res.json())
      .then(res => this.setState({posts: res}));
    fetch(`${BACKEND_URL}/api/tags`)
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
  }

  componentDidUpdate(prevProps) {
    const { fetchEndpoint } = this.props;
    if (fetchEndpoint !== prevProps.fetchEndpoint)
    {
      fetch(fetchEndpoint)
        .then(res => res.json())
        .then(res => this.setState({ posts: res }));
    }
  }

  updateIsModalOpen = (val) => {
    this.setState({ isModalOpen: val })
  }
  
  handleSortSelect = (e) => {
    const { fetchEndpoint } = this.props;
    this.setState({ sortBy: e })
    fetch(`${fetchEndpoint}?sort_by=${e}`)
      .then(res => res.json())
      .then(res => this.setState({ posts: res }))
  }
  
  handleClick() {
    this.setState(({ isMapOpen }) => ({ isMapOpen: !isMapOpen }));
  }

  render() {
    const { tags } = this.state;
    const listItems = tags.map((tag) => (
      <li key={tag.id.toString()}>
        <Link
          to={{ pathname: `/tag/${tag.id}`, state: { pageName: tag.name } }}
          key={tag.id}
        >
          {tag.name}
        </Link>
      </li>
    )
    );
    const {featured, title, subtitle } = this.props
    const { posts, isMapOpen, sortBy } = this.state
    const locationList = posts.map(post => post.locations).flat()

    return (
      <div className="postfeedPage">
        {  isMapOpen === false && (
          <div className="sideBar">
            <div className="sortBy">
              <h3 className="sortByHeader"> Sort By </h3>
              <DropdownButton
                variant="outline-primary" className="sorting"
                title={sortBy} onSelect={this.handleSortSelect}
              >
                <DropdownItem eventKey='Newest'> Newest </DropdownItem>
                <DropdownItem eventKey='Oldest'> Oldest </DropdownItem>
                <DropdownItem eventKey='Featured'> Featured </DropdownItem>
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
        )}
        <div className="postfeedFormat">
          {posts.length === 0 ? (
            <p>No resources were found.</p>
          ) : (
            <PostFeed posts={posts} featured={featured} subtitle={subtitle} title={title} />
          )}
        </div>
        {  isMapOpen === true && locationList.length > 0 && (
          <div className="theMap">
            <Map locations={locationList} searchMap />
            <a className="searchMapButton" role="button" onClick={() => {this.handleClick()}}> Close Map </a>
          </div>
        ) }
        {  isMapOpen === false && (
          <div> 
            <a className="toggleMapButton" role="button" onClick={() => {this.handleClick()}}> Toggle Map </a>
            <MapIcon className="mapIcon" />
          </div>
        )}
      </div>
    );
  }
}
export default PostFeedPage;

PostFeedPage.defaultProps = {
  featured: false,
  title: "",
  subtitle: "",
  mapDefaultOpen: false,
};
  
PostFeedPage.propTypes = {
  title: PropTypes.string,
  fetchEndpoint: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  featured: PropTypes.bool,
  mapDefaultOpen: PropTypes.bool,
};