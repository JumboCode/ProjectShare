import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from "./NotFound";

function AppRouter() {
  return ( 
    <Router>
      <div>
        <Switch>
          <Route exact path="/" />
          <Route path="/about" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default React.memo(AppRouter)