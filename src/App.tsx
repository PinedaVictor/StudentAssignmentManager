import React from "react";
import "./Database/initFirebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// TODO:
import { AuthProvider, PrivateRoute } from "./Components/user-registration";
//  Pages:
import { Landing } from "./Pages/Landing";
import { MainUI } from "./Pages/Main";

function App() {
  return (
    <>
      {/* TODO: */}
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/Home" component={MainUI} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
