import React from "react";
import { Table, Alert, Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from './fetch';

class UpdateFeaturedPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFeature1 = this.handleFeature1.bind(this);
    this.handleFeature2 = this.handleFeature2.bind(this);
    this.handleFeature3 = this.handleFeature3.bind(this);
    this.handleFeature4 = this.handleFeature4.bind(this);
    this.handleFeature5 = this.handleFeature5.bind(this);
    this.state = {
      isLoading: false,
      featuredData: [],
      postData: [],
      error: false,
      showModal: false,
      featuredPost1: 0,
      featuredPost2: 0,
      featuredPost3: 0,
      featuredPost4: 0,
      featuredPost5: 0,
      response: 0,
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/posts?featured=True&sort_by=Featured')
      .then(response => {
        this.setState({
          response: response.status,
        })
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        }
        this.setState({
          error: true,
        })
        return "error"
      })
      .then(data => 
        this.setState({
          featuredData: data,
          isLoading: false,
        })
      )
      .catch( error => {
        const { response } = this.state;
        if (response < 200 || response > 299) {
          this.setState({
            error: true,
          })
        }
      });

    fetch('http://localhost:8000/api/posts')
      .then(response => {
        this.setState({
          response: response.status,
        })
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        }
        this.setState({
          error: true,
        })
        return "error"
      })
      .then(data => 
        this.setState({
          postData: data,
          isLoading: false,
        })
      )
      .catch( error => {
        const { response } = this.state;
        if (response < 200 || response > 299) {
          this.setState({
            error: true,
          })
        }
      });
  }

  handleClick() {
    this.setState({
      showModal: true,
    })
  }

  handleClose() {
    this.setState({
      showModal: false,
      featuredPost1: 0,
      featuredPost2: 0,
      featuredPost3: 0,
      featuredPost4: 0,
      featuredPost5: 0,
    })
  }

  handleFeature1(props) {
    this.setState({
      featuredPost1: props.target.value,
    })
  }

  handleFeature2(props) {
    this.setState({
      featuredPost2: props.target.value,
    })
  }

  handleFeature3(props) {
    this.setState({
      featuredPost3: props.target.value,
    })
  }

  handleFeature4(props) {
    this.setState({
      featuredPost4: props.target.value,
    })
  }

  handleFeature5(props) {
    this.setState({
      featuredPost5: props.target.value,
    })
  }

  handleUpdate() {
    const { featuredPost1, featuredPost2, featuredPost3, featuredPost4, featuredPost5 } = this.state;
    const { authToken } = this.props;

    fetch(`${BACKEND_URL}/api/posts/set_featured_posts`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`
      },
      body: JSON.stringify({
        fp_1: featuredPost1,
        fp_2: featuredPost2,
        fp_3: featuredPost3,
        fp_4: featuredPost4,
        fp_5: featuredPost5 
      })
    })
      .then(response => {
        this.setState({
          response: response.status,
        })
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        }
        this.setState({
          error: true,
        })
        return "error"
      })
      .then(data => { 
        this.setState({
          fetchData: data,
        })
      })
      .catch( error => {
        const { response } = this.state;
        if (response < 200 || response > 299) {
          this.setState({
            error: true,
          })
        }
      });

    this.setState({
      showModal: false,
      featuredPost1: 0,
      featuredPost2: 0,
      featuredPost3: 0,
      featuredPost4: 0,
      featuredPost5: 0,
    })
  }

  render() {
    const { isLoading, featuredData, postData } = this.state
    const { error } = this.state;
    const { showModal } = this.state;

    if (error) {
      return (
        <Alert variant='danger'>
          Oops, something went wrong! Try again.
        </Alert>
      );
    } 

    if(!isLoading) {
      return (
        <div>
          <Table striped bordered className="DataTable">
            <thead>
              <tr>
                <th>Label</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {featuredData.map((post) => (
                <tr key={post.id}>
                  <td>
                    Featured Post&nbsp;
                    {post.featured_post_order}
                  </td>
                  <td>{post.title}</td>
                </tr>
              ) 
              )}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={this.handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Update Featured Posts</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Select Posts to Update: </p>
              <label htmlFor="featured-select">
                Choose post 1:&nbsp;
              </label>
              <select name="feature1" id="featured-select" onChange={this.handleFeature1}>
                <option value="default" selected disabled hidden>Select Post</option>
                {postData.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>

              <br />

              <label htmlFor="featured-select">
                Choose post 2:&nbsp;
              </label>
              <select name="feature2" id="featured-select" onChange={this.handleFeature2}>
                <option value="default" selected disabled hidden>Select Post</option>
                {postData.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>

              <br />

              <label htmlFor="featured-select">
                Choose post 3:&nbsp;
              </label>
              <select name="feature3" id="featured-select" onChange={this.handleFeature3}>
                <option value="default" selected disabled hidden>Select Post</option>
                {postData.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>

              <br />

              <label htmlFor="featured-select">
                Choose post 4:&nbsp;
              </label>
              <select name="feature4" id="featured-select" onChange={this.handleFeature4}>
                <option value="default" selected disabled hidden>Select Post</option>
                {postData.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>

              <br />

              <label htmlFor="featured-select">
                Choose post 5:&nbsp;
              </label>
              <select name="feature5" id="featured-select" onChange={this.handleFeature5}>
                <option value="default" selected disabled hidden>Select Post</option>
                {postData.map((post) => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
              <Button variant="primary" onClick={this.handleUpdate}>Update</Button>
            </Modal.Footer>
          </Modal>

          <Button className="update" variant="primary" type="button" onClick={this.handleClick}>
            Change Featured Posts
          </Button>
        </div>
      );
    } 
    return (
      <h3>Loading...</h3>
    );
    
  }
}

export default UpdateFeaturedPost;