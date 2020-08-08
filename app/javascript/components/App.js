import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Proservices from "./Proservices/Proservices";
import Proservice from "./Proservice/Proservice";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Proservices} />
        <Route exact path="/proservices/:slug" component={Proservice} />
      </Switch>
    );
  }
}

export default App;
