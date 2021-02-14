import React from "react";

/* Component for admins to create a new post, then save and POST to database */
class PostComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  postModel() {
    const {title, content} = this.state;

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
        "name": "category",
        "id": 1
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

  handleInputChange(event) {
    const {target} = event;
    const {value} = target;
    const {name} = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const post = this.postModel();

    fetch('http://localhost:8000/api/posts/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });

    event.preventDefault();
  }

  render() {
    const {title, content} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Post Title 
          <input 
            type="text" name="title" value={title}
            onChange={this.handleInputChange} 
          />
        </label>
        <br />
        <label>
          Post Content
          <input 
            type="text" name="content" value={content}
            onChange={this.handleInputChange}  
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  };
}

export default PostComposer;
