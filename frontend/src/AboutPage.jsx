import React, { Component } from 'react';
import './AboutPage.css';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="landing">
        <ul className="lets-SHARE"> 
          Let's SHARE
        </ul>
        <ul className="Spread-Health-Access-Resources-and-Education">
          Spread Health Access, Resources, and Eudcation
        </ul>
        <ul className="Project-SHARE-focuses-on-reducing-disparities-amo">
          Project SHARE focuses on reducing disparities among Tufts and local communities by advancing access to health care, 
          and providing resources and education in support of the universal right to health.
        </ul>
        <ul className=".Rectangle-6 "> 
          <li className="Rectangle-5">
          </li>
          <li className="Were-a-team-of-students-at-Tufts-University">
            We’re a team of students at Tufts University
          </li>
          <li className=".Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </li>
        </ul>
        <ul className="Get-involved">
          Get involved
        </ul>
        <ul className="Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ul>
        <ul className="buttonprimary">
          <li className="View-Club-Website">
            View Club Website
          </li>
        </ul>
        <ul className="Rectangle-7 ">
          <li className="Brought-to-you-by-Project-SHARE">
            Brought to you by Project SHARE
          </li>
          <li className="Spreading-Health-Access-Resources-and-Education">
            Spreading Health Access, Resources, and Education
          </li>
          <li className="About">
            About
          </li>
          <li className="Contact-Us">
            Contact Us
          </li>
        </ul>
      </div>
    );
  }
}
export default AboutPage;
