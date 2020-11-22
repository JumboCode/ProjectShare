import React from 'react';
import { Link } from "react-router-dom";

/* NotFound Component: displays the Not Found page */
const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>Sorry, the page you were looking for could not be found.</p>
    <Link to="/">
      Back to Home
    </Link>
  </div>
);

export default NotFound;