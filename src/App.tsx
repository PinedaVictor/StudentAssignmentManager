import React from "react";
import "./Database/initFirebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// TODO:
// import { AuthProvider } from "./Database/Auth";
//  Pages:
import { Landing } from "./Pages/Landing";
// import { Home } from "./Pages/Main";

function App() {
  return (
    <>
      {/* TODO: */}
      {/* <AuthProvider> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/register" component={Registration} /> */}
          {/* <Route exact path="/" component={Home} /> */}
        </Switch>
      </Router>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
