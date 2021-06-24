import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { routes } from "./routes/index";

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route path={path} component={component} />
        ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
