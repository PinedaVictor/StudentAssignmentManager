import React from "react";
import "./Database/initFirebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute } from "./Components/user-registration";
//  Pages:
import { TodoList, Main, Landing, Course, Homework, Exams, Project } from "./Pages";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/Login" component={Landing} />
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/Courses" component={Course} />
            <PrivateRoute exact path="/TODO" component={TodoList} />
            <PrivateRoute exact path="/Homework" component={Homework} />
            <PrivateRoute exact path="/Exam" component={Exams} />
            <PrivateRoute exact path="/Project" component={Project} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
