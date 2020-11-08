import React from 'react';
import { Link } from "react-router-dom";

/* NotFound Component: displays the Not Found page */
const NotFound = () => (
    <div>
        <h1>404 - Page Not Found!</h1>
        <Link to="/">
            Back to Home
        </Link>
    </div>
);

export default NotFound;