import React, { Component } from 'react';
import './FooterElement.css';

class FooterElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Rectangle-7">
        <ul className="Brought-to-you-by-Project-SHARE">
          Brought to you by Project SHARE
        </ul>
        <ul className="Spreading-Health-Access-Resources-and-Education">
          Spreading Health Access, Resources, and Education
        </ul>
        <ul className="About">
          About
        </ul>
        <ul className="Contact-Us">
          Contact Us
        </ul>
      </div>

    );
  }
}
export default FooterElement;