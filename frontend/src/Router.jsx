import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function AppRouter() {
  return ( 
    <Router>
      <div>
        <Switch>
          <Route exact path="/" />
          <Route path="/about" />
        </Switch>
      </div>
    </Router>
  );
}

export default React.memo(AppRouter)