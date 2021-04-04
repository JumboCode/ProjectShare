import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './FooterElement.css';

class FooterElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-wrapper">
        <ul className="footer-credits">
          Brought to you by Project SHARE
        </ul>
        <ul className="footer-credits-subtitle">
          Spreading Health Access, Resources, and Education
        </ul>
        <Link className="About" to="/about"> About </Link>
        <ul className="Contact-Us">
          Contact Us 
        </ul>
      </div>

    );
  }
}
export default FooterElement;