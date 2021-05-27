import React, { Component } from 'react';
import ContactForm from './ContactForm'
import './AboutPage.css';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleClick = () => {
  }


  render() {
    return (
      <div className="landing">
        <div className="intro">
          <h1>Let&apos;s SHARE</h1>
          <h3 className="about-subheading">Spread Health Acess, Resources, and Education</h3>
          <p className="about-page-paragraph">
            Project SHARE focuses on reducing disparities among Tufts and local 
            communities by advancing access to health care, and providing 
            resources and education in support of the universal right to health.​
          </p>
        </div>
        <div className="middle-strip">
          <div className="club-bio">
            <img className="bio-picture" src="https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png" alt="Project SHARE club" />
            <div className="bio-text">
              <h2 className="about-page-heading">We&apos;re a team of students at Tufts University</h2>
              <p className="about-page-paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur.
              </p>
              <button className="bio-button" type="button">
                View Club Website
              </button>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    );
  }
}
export default AboutPage;
