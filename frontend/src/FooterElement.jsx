import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from "react-router-dom";
import './FooterElement.css';

class FooterElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="footer-wrapper">
        <ul className="footer-credits">
          Brought to you by Project SHARE
        </ul>
        <ul className="footer-credits-subtitle">
          Spreading Health Access, Resources, and Education
        </ul>
        <Link className="About" to="/about"> About </Link>
        {isAuthenticated ? (
          <span className="Contact-Us">
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/logout"> Logout </Link>
          </span>
        ) : (
          <Link className="Contact-Us" to="/login"> Admin Login </Link>
        )}
        
      </div>

    );
  }
}
export default FooterElement;

FooterElement.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}