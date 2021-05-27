import React from "react";
import { Table } from 'react-bootstrap';
import './AdminDashboard.css';
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
      .catch(error => console.error('Error: Could not fetch data.'));
  }

  render() {
    const { isLoading, fetchData } = this.state;
    const { authToken } = this.props;
    if(!isLoading) {
      return (
        <div className="admin-page-container">
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
              {fetchData.map((post,index) => (
                <tr key={index}>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>
                    {post.tags.map((tags, i) => 
                      <p key={i}>{tags.name}</p> )}
                  </td>
                  <td>{post.category.name}</td>
                </tr>
              ) 
              )}
            </tbody>
          </Table>
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