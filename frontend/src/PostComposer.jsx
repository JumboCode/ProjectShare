import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import PostContentEditor from './PostContentEditor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostComposer.css';

/* 
 * Component for admins to create a new post, then save and POST to database 
 * Post has Title, content, category, tags, locations, and images
 * User may also edit post content
 */
class PostComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      category: '',
      selectedTags: [],
      locations: [],
      images: [],
      categories: [],
      tags: [],
      addCategoryClicked: false,
      newCategoryName: '',
      addTagClicked: false,
      newTagName: '',
      newLongitude: '',
      newLatitude: '',
      newLocationName: '',
      addLocationClicked: false,
      selectedFile: ''
    };

    this.fileInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSetContent = this.handleSetContent.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.getCategoriesList = this.getCategoriesList.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.getTagsList = this.getTagsList.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleSelectTags = this.handleSelectTags.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddLocation = this.handleAddLocation.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
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
    const {title, content, category, selectedTags, locations, images} = this.state;

    return ({
      "title": title,
      "content": content,
      "language": "EN",
      "images": images,
      "tags": selectedTags,
      "category": category,
      "date": new Date().toISOString(),
      "locations": locations
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
    const selectedCategory = { name: event };  
    this.setState({ category: selectedCategory })
  }

  handleSetContent(contentFormatted) {
    this.setState({ content: contentFormatted });
  } 

  // When a tag is selected from dropdown, save to selected tags array  
  handleSelectTags(event) {
    const { selectedTags } = this.state;
    const selectedTag = { name: event };    

    // Add a tag to selected tags iff it hasn't been added
    if (!selectedTags.some(tag => tag.name === selectedTag.name)) {
      selectedTags.push(selectedTag);
    };
  }

  // When user add a new category, apply category to post
  handleAddCategory() {
    const { newCategoryName } = this.state;

    // Get added category and apply to current post
    const data = { name: newCategoryName };
    this.setState({ category: data });
    // Set create category input field to empty
    this.setState({ newCategoryName: '', addCategoryClicked: false });
  }

  // When user add a new tag, apply tag to post
  handleAddTag() {
    const { newTagName, selectedTags } = this.state;
    const data = { name: newTagName };

    // Get added tag and apply to current post
    if (!selectedTags.some(tag => tag.name === newTagName)) {
      selectedTags.push(data);
    };

    // Set create category input field to empty
    this.setState({ newTagName: '', addTagClicked: false });
  }

  // When a tag is clicked, remove that tag from selected list
  handleRemoveTag(event) {
    const { selectedTags } = this.state;
    const tagName = event.target.getAttribute("value"); 

    // Filter and create a new list without the tag clicked   
    const tags = selectedTags.filter(tag => tag.name !== tagName);
    this.setState({ selectedTags : tags });
  }

  // When location's info is filled out, add to locations array 
  handleAddLocation() {
    const { newLatitude, newLongitude, newLocationName, locations } = this.state;
    const data = {
      latitude: newLatitude,
      longitude: newLongitude,
      name: newLocationName
    }

    // If same exact location has been added before, do not add again
    if (!locations.some(l => 
      (l.latitude === newLatitude) && (l.longitude === newLongitude))) {
      locations.push(data);
    };
  
    this.setState({ newLatitude: '', newLongitude: '', newLocationName: '', 
      addLocationClicked: false });
  }

  // Get information of chosen file and upload to server
  handleUploadImage() {
    const { selectedFile, images } = this.state;
    
    const formdata = new FormData();
    formdata.append("img_file", selectedFile);
    
    const requestOptions = {
      method: 'POST',
      body: formdata
    };

    // POST request to upload image and append to list of post's images 
    fetch("http://localhost:8000/api/images/add", requestOptions)
      .then(response => response.json())
      .then(data => { images.push({ id: data.id })})
      // reset input Image file
      .then(() => { this.fileInput.current.value = '' })
      .then(() => this.setState({ selectedFile: '' }));
  }


  render() {

    const { title, categories, category, addCategoryClicked, 
      newCategoryName, tags, addTagClicked, 
      newTagName, selectedTags, locations, addLocationClicked, newLatitude, 
      newLongitude, newLocationName, images } = this.state;

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
            <PostContentEditor
              setTextFormatted={this.handleSetContent}
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
                      eventKey={categoryItem.name} 
                      key={categoryItem.name} 
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
                  key={tag.name}
                  variant="secondary" className="tagBadge"
                  value={tag.name}
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
                      eventKey={tag.name} 
                      key={tag.name} 
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

          {/* Add Location */}
          <Form.Group>
            <Form.Label>Locations</Form.Label>
            {locations.map((location, index) => 
              ( 
                <Badge 
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  variant="secondary" className="tagBadge"
                >
                  { `(${location.name}, ${location.latitude}, ${location.longitude})` }
                </Badge>
              ))}
            <br />
            <Button
              onClick={() => this.setState({ addLocationClicked:true })}
            >
              Add Map Locations
            </Button>
            {addLocationClicked && (
              <Form.Group className="addLocationsForm">
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="10.000"
                      name="newLatitude"
                      value={newLatitude} 
                      onChange={this.handleInputChange} 
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="20.000" 
                      name="newLongitude"
                      value={newLongitude} 
                      onChange={this.handleInputChange} 
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Description/Name</Form.Label>
                  <Form.Control 
                    type="text"  
                    placeholder="1234 Main St"
                    name="newLocationName"
                    value={newLocationName}
                    onChange={this.handleInputChange} 
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={this.handleAddLocation}
                >
                  Add
                </Button>
              </Form.Group>
            )}
          </Form.Group>

          {/* Add Image */}
          <Form.Group>
            <Form.Label> Images </Form.Label>
            {images.map(image => 
              ( 
                <Badge 
                  key={image.id}
                  variant="secondary" className="stickyBadge"
                >
                  {`IMG ${image.id}`}
                </Badge>
              ))}
            <Form.Group className="addForm">
              <Form.File 
                className="chooseFileButton"
                ref={this.fileInput}
                onChange={(e) => this.setState({selectedFile: e.target.files[0]})} 
              />
              <Button 
                variant="primary" 
                onClick={this.handleUploadImage}
              >
                Upload
              </Button>
            </Form.Group>
            <Form.Text className="text-muted">
              (You need to upload image before submitting post)
            </Form.Text>
          </Form.Group>
          
          {/* Submit button */}
          <Button className="submitButton" variant="primary" type="submit">  
            Submit
          </Button>

        </Form>
      </div>
    );
  };
}

export default PostComposer;
