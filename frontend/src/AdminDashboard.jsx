import React from "react";
import { Table , Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import { PropTypes } from 'prop-types';
import UpdateFeaturedPost from './UpdateFeaturedPost';
import { BACKEND_URL } from './fetch';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fetchData: [],
    };
  }

  componentDidMount() {
    fetch(`${BACKEND_URL}/api/posts`)
      .then(response => response.json())
      .then(data => 
        this.setState({
          fetchData: data,
          isLoading: false,
        })
      )
      .catch(error => console.error(error));
  }

  render() {
    const { isLoading, fetchData } = this.state;
    const { authToken } = this.props;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    if(!isLoading) {
      return (
        <div className="admin-page-container">
          <h2>Add A New Resource</h2>
          <Button className="add-post-button" variant="primary" type="button">
            <Link to="add-post">Add A Resource</Link>
          </Button>
          <h2>Manage All Resources</h2>
          <Table striped bordered className="DataTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {fetchData.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={{ pathname: `edit-post/${post.id}`, state: {post} }}>
                      {post.title}
                    </Link>
                  </td>
                  <td>{new Date(post.date).toLocaleDateString("en-US", dateOptions)}</td>
                  <td>
                    {post.tags.map((tags) => 
                      <p key={post.id}>{tags.name}</p> )}
                  </td>
                  <td>{post.category.name}</td>
                </tr>
              ) 
              )}
            </tbody>
          </Table>
          <h2>Manage Featured Resources</h2>
          <UpdateFeaturedPost authToken={authToken} />
        </div>
      );
    } 
    return (
      <h3>Loading...</h3>
    );
    
  }
}

export default Dashboard;


Dashboard.propTypes = {
  authToken: PropTypes.string.isRequired,
};
