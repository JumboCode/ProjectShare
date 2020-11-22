import React, { Component } from 'react';
import './AboutPage.css';
import Button from 'react-bootstrap/Button';
import Footer from './FooterElement';
import Navigation from './Navigation';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleClick = () => {
  }


  render() {
    return (
      <div>
        <Navigation />
        <div className="landing">
          <ul className="lets-SHARE"> 
            Let&apos;s SHARE
          </ul>
          <ul className="Spread-Health-Access-Resources-and-Education">
            Spread Health Access, Resources, and Eudcation
          </ul>
          <ul className="Project-SHARE-focuses-on-reducing-disparities-amon">
            Project SHARE focuses on reducing disparities among Tufts and local communities by advancing access to health care, 
            and providing resources and education in support of the universal right to health.
          </ul>
          <ul className="Rectangle-6" /> 
          <ul className="Rectangle-5" />
          <ul className="Were-a-team-of-students-at-Tufts-University">
            We’re a team of students at Tufts University
          </ul>
          <ul className="Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </ul>
          <ul className="Get-involved">
            Get involved
          </ul>
          <ul className="Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </ul>
          <Button className="buttonprimary" type="button" onClick={this.handleClick} />
          <ul className="View-Club-Website">
            View Club Website
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
export default AboutPage;
