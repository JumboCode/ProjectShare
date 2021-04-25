import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './HelpModal.css';


class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] }
  }

  componentDidMount() {
      fetch('http://localhost:8000/api/tags')
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => this.setState({tags: res}))
  }

  render() {
    const {tags} = this.state
    return (
      <div>

              <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title variant="header">Resource Finder</Modal.Title>
                </Modal.Header>

                <Modal.Body>Select topics you are interested in: </Modal.Body>
                <Modal.Body>
                    {tags && tags.map(tag=> (
                        <div key = {tag.id}>
                            <div class="checkbox">
                                <div text="         "> </div>
                                <label class="tagid"> {tag.name} </label>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary">Cancel</Button>{' '}
                    <Button variant="primary">Next</Button>{' '}
                </Modal.Footer>
            </Modal.Dialog>


    </div>
    );
  }
}

export default HelpModal;
