import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import './HelpModal.css';


class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [], selectedTags: [], modalPage: "tags" }
    this.onTagClick = this.onTagClick.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/tags')
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => this.setState({tags: res}))
  }

  onTagClick(event) {
    const { target: { value: selectedTagId }} = event;
    
    const { tags, selectedTags } = this.state;
    const selectedTagsIds = selectedTags.map(t => t.id);
    const selectedTagData = tags.filter(tag => tag.id === +selectedTagId );

    if (selectedTagsIds.includes(+selectedTagId)) {
      const tagsModified = selectedTags.filter(tag => tag.id !== +selectedTagId)
      this.setState({ selectedTags: tagsModified })
    } else {
      this.setState(prevState => ({
        selectedTags: [...prevState.selectedTags, ...selectedTagData]
      }))
    }

  }

  modalPage = () => {
    this.setState({modalPage: "locations"})
  }

  closeModal = () => {
    const { updateIsModalOpen } = this.props;
    updateIsModalOpen(false);
  }

  render() {
    const { isModalOpen, updateIsModalOpen } = this.props;
    const {tags, modalPage} = this.state
    return (
      <div>
        <Modal show={isModalOpen} size="lg" onHide={updateIsModalOpen}>
          <Modal.Header closeButton>
            <h3 variant="header">Resource Finder</h3>
          </Modal.Header>
          {modalPage === "tags" && (
            <div>
              <Modal.Body>
                <h5 className="modal-p-text"> Select topics you are interested in:</h5>
                <div className="modal-tags-list-wrapper">
                  {tags && tags.map(tag => (
                    <div key={tag.id}>
                      <input value={tag.id} type="checkbox" className="checkbox" variant="primary" onClick={this.onTagClick} />
                      <label htmlFor="tag.id" className="tagid" variant="paragraph">
                        {' '}
                        {tag.name}
                        {' '}
                      </label>
                    </div>
                  ))}
                </div>
                
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


HelpModal.propTypes = {
  updateIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
}