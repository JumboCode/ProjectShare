import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import './HelpModal.css';
import { BACKEND_URL } from './fetch';


class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selectedTags: [],
      modalPage: "tags",
      regions: [],
      selectedRegion: '',
    }
    this.onTagClick = this.onTagClick.bind(this);
  }

  componentDidMount() {
    fetch(`${BACKEND_URL}/api/tags`)
      .then(res => res.json())
      .then(res => this.setState({tags: res}))
    fetch(`${BACKEND_URL}/api/regions`)
      .then(res => res.json())
      .then(res => this.setState({ regions: res }))
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

  setRegion = e => {
    this.setState({
      selectedRegion: e.target.value,
    });
  }

  getResources = () => {
    const { history } = this.props;
    const { selectedRegion, selectedTags } = this.state;
    let searchPageString = ''
    if (selectedRegion === "-1") {
      searchPageString = `search?`;
    } else {
      searchPageString = `search?region_id=${selectedRegion}`;
    }
    
    selectedTags.forEach(tag => {
      searchPageString += `&tag_id=${tag.id}`
    })
    this.closeModal();
    history.push(searchPageString);
  }

  closeModal = () => {
    const { updateIsModalOpen } = this.props;
    updateIsModalOpen(false);
  }

  modalPage = () => {
    this.setState({ modalPage: "locations" })
  }

  render() {
    const { isModalOpen, updateIsModalOpen } = this.props;
    const {tags, modalPage, regions} = this.state;
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
          {modalPage === "locations" && (
            <div>
              <Modal.Body>
                <h5 className="modal-p-text"> Select your region</h5>
                <div className="modal-tags-list-wrapper">
                  <form>
                    <input
                      value={-1}
                      type="radio"
                      className="checkbox"
                      variant="primary"
                      onClick={this.setRegion}
                      name="region"
                    />
                    <label htmlFor={-1} className="tagid" variant="paragraph">
                      Any Region
                    </label>
                    {regions && regions.map(region => (
                      <div key={region.id}>       
                        <input
                          value={region.id}
                          type="radio"
                          className="checkbox"
                          variant="primary"
                          onClick={this.setRegion}
                          name="region"
                        />
                        <label htmlFor={region.id} className="tagid" variant="paragraph">
                          {' '}
                          {region.name}
                          {' '}
                        </label>
                      </div>
                    ))}
                  </form>
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
            {modalPage === "locations" && (
              <div>
                <Button variant="primary" onClick={this.getResources}>Find Resources</Button>
                {' '}
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default withRouter(HelpModal);


HelpModal.propTypes = {
  updateIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
}
