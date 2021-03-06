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
      category: {
        id: '',
        name: ''
      },
      selectedTags: [],
      categories: [],
      tags: [],
      addCategoryClicked: false,
      newCategoryName: '',
      addTagClicked: false,
      newTagName: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.getCategoriesList = this.getCategoriesList.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.getTagsList = this.getTagsList.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleSelectTags = this.handleSelectTags.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  // When component is created, fetch current list of categories 
  componentDidMount() {
    this.getCategoriesList();
    this.getTagsList();
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

  // Get list of tags to populate dropdown selector
  getTagsList() {
    fetch('http://localhost:8000/api/tags')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tags: result
          });
        });
  }
  
  // Schema model for posting to server when form is submitted
  postModel() {
    const {title, content, category, selectedTags} = this.state;

    return ({
      "title": title,
      "content": content,
      "language": "EN",
      "images": [],
      "tags": selectedTags,
      "category": category,
      "date": "2021-01-06T02:50:24.052412Z",
      "locations": []
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
    event.preventDefault();
    const post = this.postModel();   

    fetch('http://localhost:8000/api/posts/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    }).then(() => alert("New post created!"));
  }

  // When a category is selected from dropdown, save to state 
  handleSelectCategory(event) {      
    const selectedCategory = JSON.parse(event);
    this.setState({ category: selectedCategory })
  }

  // When a tag is selected from dropdown, save to selected tags array  
  handleSelectTags(event) {
    const { selectedTags } = this.state;
    const selectedTag = JSON.parse(event);

    if (!selectedTags.some(tag => tag.id === selectedTag.id)) {
      selectedTags.push(selectedTag);
    };
  }

  // When user add a new category, send POST request to add to database
  handleAddCategory() {
    const { newCategoryName, category } = this.state;

    fetch('http://localhost:8000/api/categories/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { name: newCategoryName }
      )
    })
      // Get added category and apply to current post
      .then(response => response.json())
      .then(data => this.setState(Object.assign(category, data)))
      // Set create category input field to empty
      .then(() => this.setState({ newCategoryName: '' }));
  }

  // When user add a new tag, send POST request to add to database
  handleAddTag() {
    const { newTagName, selectedTags } = this.state;

    fetch('http://localhost:8000/api/tags/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { name: newTagName }
      )
    })
      // Get added tag and apply to current post
      .then(response => response.json())
      .then(data => selectedTags.push(data))
      // Set create category input field to empty
      .then(() => this.setState({ newTagName:'' }));
  }

  // When a tag is clicked, remove that tag from selected list
  handleRemoveTag(event) {
    const { selectedTags } = this.state;
    const tagId = parseInt(event.target.getAttribute("value"), 10);    
    const tags = selectedTags.filter(tag => tag.id !== tagId);
    
    this.setState({ selectedTags : tags });
  }

  render() {

    const { title, content, categories, category, addCategoryClicked, 
      newCategoryName, tags, addTagClicked, 
      newTagName, selectedTags } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {/* Categories Form */}
          {/* Title input */}
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
          {/* Content input */}
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
          {/* Category Choose or Add buttons */}
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Badge 
              variant="secondary" className="categoryBadge"
            >
              {category.name}
            </Badge>
            <div className="groupButtons">
              <DropdownButton
                title="Choose a Category"
                name="categoryName"
                onClick={this.getCategoriesList}
                onSelect={this.handleSelectCategory}
              >
                {categories.map(categoryItem => 
                  (                  
                    <Dropdown.Item 
                      eventKey={JSON.stringify(categoryItem)} 
                      key={categoryItem.id} 
                    >
                      {categoryItem.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>

              <Button
                className="addButton"
                onClick={() => this.setState({addCategoryClicked:true})}
              >
                Add a New Category
              </Button>
            </div>
          </Form.Group>
          {/* Render input box for new Category if Add button clicked */}
          {addCategoryClicked && (
            <Form.Group className="addForm">
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

          {/* Tags Form */}
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            {selectedTags.map(tag => 
              ( 
                <Badge 
                  onClick={this.handleRemoveTag}
                  key={tag.id}
                  variant="secondary" className="tagBadge"
                  value={tag.id}
                >
                  {tag.name}
                </Badge>
              ))}
            <div className="groupButtons">
              <DropdownButton
                title="Choose a Tag"
                name="categoryName"
                onClick={this.getTagsList}
                onSelect={this.handleSelectTags}
              >
                {tags.map(tag => 
                  (                  
                    <Dropdown.Item 
                      eventKey={JSON.stringify(tag)} 
                      key={tag.id} 
                    >
                      {tag.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>

              <Button
                className="addButton"
                onClick={() => this.setState({addTagClicked:true})}
              >
                Add a New Tag
              </Button>
            </div>
          </Form.Group>
          {/* Render input box for new Tag if Add button clicked */}
          {addTagClicked && (
            <Form.Group className="addForm">
              <Form.Control 
                type="text"
                name="newTagName"
                placeholder="Enter tag name"
                value={newTagName}
                onChange={this.handleInputChange} 
              />
              <Button onClick={this.handleAddTag}> + </Button>
            </Form.Group>
          )}

          {/* Submit button */}
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
