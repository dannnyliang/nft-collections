import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Detail from "./Detail";
import List from "./List";

function Index() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/collections/:id">
          <Detail />
        </Route>
        <Route path="/collections">
          <List />
        </Route>
        <Route path="/">
          <Link to="/collections">to List Page</Link>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Index;
