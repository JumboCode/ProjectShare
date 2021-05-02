import React from "react";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fetchData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/posts')
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
    const { isLoading, fetchData } = this.state
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
        </div>
      );
    } 
    return (
      <h3>Loading...</h3>
    );
    
  }
}

export default Dashboard;