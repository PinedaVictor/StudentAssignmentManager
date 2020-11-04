import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

interface RouterProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

export const PrivateRoute: React.FC<RouterProps> = (props) => {
  const [currentUser] = useContext(AuthContext);
  console.log("User in private route:::", currentUser);

  return currentUser ? (
    <Route path={props.path} component={props.component} {...props.children} />
  ) : (
    <Redirect to="/" />
  );
};
