import React from 'react';
import { Link } from "react-router-dom";
// import './NotFound.css'; 

/* NotFound Component: displays the Not Found page */

const NotFound = () => (
  <div>
    <h1 
      className="error"
      style={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      404 
    </h1>
  
    <p 
      className="message"
      style={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Sorry, the page you were looking for could not be found. 
    </p> 
    <div className="link">
      <Link 
        to="/"
        style={{
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;