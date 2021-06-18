import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import PostContentEditor from './PostContentEditor';
import './PostComposer.css';
import { BACKEND_URL } from './fetch';

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
      region: null,
      regions: [],
      selectedTags: [],
      locations: [],
      images: [],
      pdf: null,
      categories: [],
      tags: [],
      addCategoryClicked: false,
      newCategoryName: '',
      addTagClicked: false,
      newTagName: '',
      "date": new Date().toISOString(),
      "featuredPostOrder": null,
      newLongitude: '',
      newLatitude: '',
      newLocationName: '',
      addLocationClicked: false,
      selectedPdfFile: '',
      selectedFile: '',
      errors: {},
      success: null,
      show: true,
      editMode: false,
    };

    this.fileInput = React.createRef();
    this.filePdfInput = React.createRef();
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
    this.clearForm = this.clearForm.bind(this);
  }

  // When component is created, fetch current list of categories 
  componentDidMount() {
    this.getCategoriesList();
    this.getTagsList();
    this.getRegionsList();
    const { match: { params } } = this.props;
    if ('postId' in params) {
      let postData = {};
      this.setState({editMode: true});
      const {location: { state } } = this.props;
      if ('post' in state) {
        postData = state.post;
      } else {
        fetch(`${BACKEND_URL}/api/posts?post_id=${params.postId}`)
          .then(res => res.json())
          .then(res => {postData = res});
      }
      this.setState({
        "title": postData.title,
        "content": postData.content,
        "images": postData.images.map(img => ({ name: img.id })),
        "pdf": postData.pdf ? {id: postData.pdf.id} : null,
        "selectedTags": postData.tags.map(tag => ({ name: tag.name})),
        "category": {name: postData.category.name},
        "region": postData.region,
        "date": postData.date,
        "locations": postData.locations,
        "featuredPostOrder": postData.featured_post_order,
      });
    }
  }
 
  // Get list of categories to populate dropdown selector
  getCategoriesList() {
    fetch(`${BACKEND_URL}/api/categories`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            categories: result
          });
        });
  }

  // Get list of regions to populate dropdown selector
  getRegionsList = () => {
    fetch(`${BACKEND_URL}/api/regions`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            regions: result
          });
        });
  }

  // Get list of tags to populate dropdown selector
  getTagsList() {
    fetch(`${BACKEND_URL}/api/tags`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tags: result
          });
        });
  }
  

  handleSelectRegion = (event) => {
    const selectedRegion = { name: event };
    this.setState({ region: selectedRegion })
  }



  // Get information of chosen file and upload to server
  handleUploadPdf = () => {
    const { selectedPdfFile } = this.state;
    const { authToken } = this.props;

    // no file chosen
    if (selectedPdfFile === '') {
      this.setState({ selectedPdfFile: null });
      return;
    };

    const formdata = new FormData();
    formdata.append("pdf_file", selectedPdfFile);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      headers: {
        'Authorization': `Token ${authToken}`
      }
    };

    // POST request to upload pdf
    fetch(`${BACKEND_URL}/api/pdfs/add`, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ pdf: { id: data.id } }))
      // reset input Pdf file
      .then(() => { this.filePdfInput.current.value = '' })
      .then(() => this.setState({ selectedPdfFile: '' }));
  }

  deletePost = () => {
    const { match: { params }, history, authToken } = this.props;

    fetch(`${BACKEND_URL}/api/posts/${params.postId}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${authToken}`
      }
    })
      .then(response => response.json())
    history.push('/dashboard');
  }

  // When form is submitted, create a new post and send to server
  handleSubmit(event) {
    const { authToken } = this.props;
    const { editMode } = this.state;
    event.preventDefault();
    const post = this.postModel();

    const { match: { params } } = this.props;
    const fetchUrl = (editMode 
      ? `${BACKEND_URL}/api/posts/${params.postId}/update`
      : `${BACKEND_URL}/api/posts/add`);
    const fetchMethod = editMode ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${authToken}`
      },
      body: JSON.stringify(post)
    })
      .then((response) => {
        // Status code is 400, throw error object to display error messages
        if (!response.ok) {
          return response.json().then((error) => {throw error})
        }
        
        // Status code is 200, clear form and display success message
        this.setState({ 
          errors: {},
          success: "New post successfully created!" 
        })
        this.clearForm();
        window.scrollTo(0, 0);
        return response.json();
      })
      .catch((error) => {     
        this.setState({ errors: error });        
      });
  }
  

  // Clear out the form when post has successfully been created
  clearForm() {
    const { editMode} =this.state;
    const { history} =this.props;
    this.setState({
      title: '',
      content: '',
      category: '',
      region: null,
      pdf: null,
      selectedTags: [],
      locations: [],
      images: [],
      categories: []
    })
    if (editMode) {
      history.push('/dashboard');
    }
  }

  // When a category is selected from dropdown, save to state 
  handleSelectCategory(event) {      
    const selectedCategory = { name: event };  
    this.setState({ category: selectedCategory })
  }


  // Schema model for posting to server when form is submitted
  postModel() {
    const { title, content, category, selectedTags, locations, images, region, pdf, date, featuredPostOrder } = this.state;
    return ({
      "title": title,
      "content": content,
      "language": "EN",
      "images": images,
      "pdf": pdf,
      "tags": selectedTags,
      "category": category,
      "region": region,
      "date": date,
      "locations": locations,
      "featuredPostOrder": featuredPostOrder,
    });
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

  // When user add a new region, apply region to post
  handleAddRegion() {
    const { newRegionName } = this.state;

    // Get added region and apply to current post
    const data = { name: newRegionName };
    this.setState({ region: data });
    // Set create region input field to empty
    this.setState({ newRegionName: '', addRegionClicked: false });
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
    const { authToken } = this.props;

    // no file chosen
    if (selectedFile === '') { 
      this.setState({ selectedFile: null });
      return;
    };

    const formdata = new FormData();
    formdata.append("img_file", selectedFile);
    
    const requestOptions = {
      method: 'POST',
      body: formdata,
      headers: {
        'Authorization': `Token ${authToken}`
      }
    };

    // POST request to upload image and append to list of post's images 
    fetch(`${BACKEND_URL}/api/images/add`, requestOptions)
      .then(response => response.json())
      .then(data => { images.push({ id: data.id })})
      // reset input Image file
      .then(() => { this.fileInput.current.value = '' })
      .then(() => this.setState({ selectedFile: '' }));
  }


  // Update text field as user inputs
  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }


  render() {

    const { title, categories, category, addCategoryClicked, 
      newCategoryName, tags, addTagClicked, editMode, content,
      newTagName, selectedTags, locations, addLocationClicked, newLatitude, 
      newLongitude, newLocationName, images, errors, success, selectedFile,
      show, regions, region, addRegionClicked, pdf, selectedPdfFile,
      newRegionName, } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="form-post-composer">
          {/* Categories Form */}
          {/* Title input */}
          {success && show && (
            <Alert 
              variant="success" 
              onClose={() => this.setState({show: false})} 
              dismissible
            > 
              {success} 
            </Alert> 
          )}
          <Form.Group>
            <Form.Label>Post title</Form.Label>
            {errors.title && (
              <Alert variant="danger"> 
                {`${errors.content}`} 
              </Alert> 
            )}
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
            {errors.content && (
              <Alert variant="danger"> 
                {`${errors.content}`} 
              </Alert>
            )}
            {editMode && content !== null && (
              <PostContentEditor
                setTextFormatted={this.handleSetContent}
                initialContent={content}
              />
            )}
            {!editMode && (
              <PostContentEditor
                setTextFormatted={this.handleSetContent}
              />
            )}
          </Form.Group>
          {/* Category Choose or Add buttons */}
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Badge 
              variant="secondary" className="categoryBadge"
            >
              {category.name}
            </Badge>
            {errors.category && (
              <Alert variant="danger"> 
                {`${errors.category.non_field_errors}`} 
              </Alert>
            )}
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


          {/* Region Choose or Add buttons */}
          <Form.Group>
            <Form.Label>Region</Form.Label>
            {region && (
              <Badge
                variant="secondary" className="categoryBadge"
              >
                {region.name}
              </Badge>
            )}
            {errors.region && (
              <Alert variant="danger">
                {`${errors.region.non_field_errors}`}
              </Alert>
            )}
            <div className="groupButtons">
              <DropdownButton
                title="Choose a Region"
                name="regionName"
                onClick={this.getRegionsList}
                onSelect={this.handleSelectRegion}
              >
                {regions.map(regionItem =>
                  (
                    <Dropdown.Item
                      eventKey={regionItem.name}
                      key={regionItem.name}
                    >
                      {regionItem.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>

              <Button
                className="addButton"
                onClick={() => this.setState({ addRegionClicked: true })}
              >
                Add a New Region
              </Button>
            </div>
          </Form.Group>
          {/* Render input box for new Region if Add button clicked */}
          {addRegionClicked && (
            <Form.Group className="addForm">
              <Form.Control
                type="text"
                name="newRegionName"
                placeholder="Enter region name"
                value={newRegionName}
                onChange={this.handleInputChange}
              />
              <Button onClick={this.handleAddRegion}> + </Button>
            </Form.Group>
          )}


          {/* Tags Form */}
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            {selectedTags.map(tag => ( 
              <OverlayTrigger
                key={tag.id}
                placement='bottom'
                overlay={(
                  <Tooltip id="tooltip-bottom">
                    Remove tag
                  </Tooltip>
                )}
              >
                <Badge 
                  onClick={this.handleRemoveTag}
                  key={tag.name}
                  variant="secondary" className="tagBadgeHover"
                  value={tag.name}
                >
                  {tag.name}
                </Badge>
              </OverlayTrigger>
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
            {errors.locations && (
              <Alert variant="danger"> 
                {errors.locations[0].latitude && (
                  <span>
                    {`Latitude: ${errors.locations[0].latitude}`}
                    <br />
                  </span>
                )}
                {errors.locations[0].longitude && (
                  <span>
                    {`Longitude: ${errors.locations[0].longitude}`}
                    <br />
                  </span>
                )}
                {errors.locations[0].name && (
                  <span>
                    {`Location name: ${errors.locations[0].name}`}
                    <br />
                  </span>
                )}
              </Alert>
            )}
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
            {(selectedFile === null) && (
              <Alert variant="danger"> 
                Image must be selected.
              </Alert>
            )}
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
          
          {/* Add Image */}
          <Form.Group>
            <Form.Label> Pdf </Form.Label>
            {(selectedPdfFile === null) && (
              <Alert variant="danger">
                Pdf must be selected.
              </Alert>
            )}
            {pdf && (
              <Badge
                key={pdf.id}
                variant="secondary" className="stickyBadge"
              >
                {`IMG ${pdf.id}`}
              </Badge>
            )}
            <Form.Group className="addForm">
              <Form.File
                className="chooseFileButton"
                ref={this.filePdfInput}
                onChange={(e) => this.setState({ selectedPdfFile: e.target.files[0] })}
              />
              <Button
                variant="primary"
                onClick={this.handleUploadPdf}
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

        {editMode && (
          <div className="delete-post-block">
            <h3> Delete This Post</h3>
            <p> Clicking on the button below will delete this resource. This operation is irreversible. </p>
            <Button onClick={this.deletePost} variant="danger">Delete this Resource</Button>
          </div>
        )}
      </div>
    );
  };
}

export default withRouter(PostComposer);

PostComposer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    })
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      post: PropTypes.string,
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  authToken: PropTypes.string.isRequired,
};

PostComposer.defaultProps = {
  location: {
    state: {
      pageName: null,
    }
  },
  match: {
    params: {
      postId: null,
    }
  }
}