import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from './routes/index';

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map(item => (
          <Route path={item.path} component={item.component} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
