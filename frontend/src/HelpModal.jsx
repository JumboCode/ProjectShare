import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './HelpModal.css';


class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [], selectedTag: [], modalPage: "tags", isModalOpen: true}
    this.onTagClick = this.onTagClick.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/tags')
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => this.setState({tags: res}))
  }

  onTagClick(event) {
    const {target: selectedTag} = event;
    const { tags } = this.state;
    if (selectedTag.id in tags) {
      const tagsModified = tags.filter(tag => tag.id !== selectedTag.id)
      this.setState({ selectedTag: tagsModified })
    } else {
      this.setState({
        selectedTag: [...tags, selectedTag]
      })
    }

  }

  modalPage = () => {
    this.setState({modalPage: "locations"})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    const {tags, isModalOpen, modalPage} = this.state
    return (
      <div>
        <Modal show={isModalOpen} size="lg">
          <Modal.Header closeButton>
            <Modal.Title variant="header">Resource Finder</Modal.Title>
          </Modal.Header>
          {modalPage === "tags" && (
            <div>
              <Modal.Body>
                <p className="modal-p-text"> Select topics you are interested in:</p>
                {tags && tags.map(tag=> (
                  <div key={tag.id}>
                    <input type="checkbox" className="checkbox" variant="primary" onClick={this.onTagClick} />
                    <label htmlFor="tag.id" className="tagid" variant="paragraph"> 
                      {' '}
                      {tag.name}
                      {' '}
                    </label>
                  </div>
                ))}
              </Modal.Body>
            </div>
          )}
          <Modal.Footer>
            <Button variant="outline-primary" onClick={this.closeModal}>Cancel</Button>
            {' '}
            {modalPage === "tags" && (
              <div>
                <Button variant="primary" onClick={this.modalPage}>Next</Button>
                {' '}
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default HelpModal;
