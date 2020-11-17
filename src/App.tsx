import React from "react";
import "./Database/initFirebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute } from "./Components/user-registration";
//  Pages:
import { TodoList, Home, Landing, Course, Homework } from "./Pages";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/Login" component={Landing} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/Courses" component={Course} />
            <PrivateRoute exact path="/TODO" component={TodoList} />
            <PrivateRoute exact path="/Homework" component={Homework} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
