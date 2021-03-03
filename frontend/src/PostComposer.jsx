import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostComposer.css';

/* Component for admins to create a new post, then save and POST to database */
class PostComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      categoryName: '',
      categoryId: '',
      categories: [],
      addCategoryClicked: false,
      newCategoryName: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.getCategoriesList = this.getCategoriesList.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  // When component is created, fetch current list of categories 
  componentDidMount() {
    this.getCategoriesList();
  } 

  // Get list of categories to populate dropdown selector
  getCategoriesList() {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            categories: result
          });
        });
  }
  
  // Schema model for posting to server when form is submitted
  postModel() {
    const {title, content, categoryName, categoryId} = this.state;

    return ({
      "title": title,
      "content": content,
      "language": "EN",
      "images": [
        {
          "img_name": "img",
          "id": 1
        }
      ],
      "tags": [
        {
          "name": "tag",
          "id": 1
        }
      ],
      "category": {
        "name": categoryName,
        "id": categoryId 
      },
      "date": "2021-01-06T02:50:24.052412Z",
      "locations": [
        {
          "latitude": 10,
          "longitude": 20,
          "name": "NYC",
          "id": 1
        }
      ]
    });
  }

  // Update text field as user inputs
  handleInputChange(event) {
    const {target} = event;
    const {value} = target;
    const {name} = target;

    this.setState({
      [name]: value
    });
  }

  // When form is submitted, create a new post and send to server
  handleSubmit(event) {
    const post = this.postModel();    

    fetch('http://localhost:8000/api/posts/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });

    event.preventDefault();
  }

  // When a category is selected from dropdown, save to state 
  handleSelectCategory(event) {      
    const category = JSON.parse(event);
  
    this.setState({
      categoryName: category.name, 
      categoryId: category.id
    })
  }

  // When user add a new category, send POST request to add to database
  handleAddCategory() {
    const { newCategoryName } = this.state;
    const category = newCategoryName;

    fetch('http://localhost:8000/api/categories/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { name: category }
      )
    })
      // Set create category input field to empty
      .then(() => {this.setState({newCategoryName:''})})
      // Fetch categories list again with newly added category
      .then(() => {this.getCategoriesList()}); 
  }

  render() {
    const { title, content, categories, categoryName, 
      addCategoryClicked, newCategoryName } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Post title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter title" 
              name="title"
              value={title} 
              onChange={this.handleInputChange} 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Post Content</Form.Label>
            <Form.Control 
              type="text"
              name="content"
              placeholder="Enter content"
              value={content}
              onChange={this.handleInputChange} 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Badge variant="secondary">{categoryName}</Badge>
            <div className="categoryButtons">
              <DropdownButton
                title="Choose a Category"
                name="categoryName"
                onClick={this.getCategoriesList}
                onSelect={this.handleSelectCategory}
              >
                {categories.map(category => 
                  (                  
                    <Dropdown.Item 
                      eventKey={JSON.stringify(category)} 
                      key={category.id} 
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>

              <Button
                className="addCategoryButton"
                onClick={() => this.setState({addCategoryClicked:true})}
              >
                Add a New Category
              </Button>
            </div>
          </Form.Group>

          {addCategoryClicked && (
            <Form.Group className="addCategoryForm">
              <Form.Control 
                type="text"
                name="newCategoryName"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={this.handleInputChange} 
              />
              <Button onClick={this.handleAddCategory}> + </Button>
            </Form.Group>
          )}

          <Button 
            className="submitButton" 
            variant="primary" 
            type="submit"
          >
            Submit
          </Button>

        </Form>
      </div>
    );
  };
}

export default PostComposer;
