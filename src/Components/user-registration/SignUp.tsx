import React, { useContext, useCallback } from "react";
import { PRIMARY_COLOR } from "../../Styles/global";
import { Form, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { app } from "../../Database/initFirebase";
import { AuthContext } from "./AuthProvider";

export const SignUpForm: React.FC = () => {
  const [, setCurrentUser] = useContext(AuthContext);
  const history = useHistory();
  const registerUser = useCallback(
    async (event: any) => {
      event.preventDefault();
      console.log("Calling Register User");
      const { name, email, password } = event.target.elements;

      try {
        console.log("Creating user");
        console.log(name.value, email.value, password.value);
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((userCredentials) => {
            console.log(
              "Now setting user in firestore with:::",
              userCredentials
            );
            setCurrentUser(userCredentials.user);
            app
              .firestore()
              .collection("users")
              .doc(userCredentials.user?.uid)
              .set({
                name: name.value,
                email: email.value,
              });
            console.log("Setting current user");
          })
          .then(() => {
            console.log("Pushing history");
            history.push("/Home");
          })
          .catch((error) => {
            console.log("Could not register user:::::", error);
          });
      } catch {
        console.log("Error signing up user");
      }
    },
    [history, setCurrentUser]
  );

  // if (currentUser) {
  //   console.log("User:::", currentUser);
  //   return <Redirect to="/Home" />;
  // } else {
  //   console.log(currentUser);
  //   console.log("::::::::::::::::::::", !currentUser);
  // }

  // if (!user) {
  //   console.log("User:::", user);
  //   return <Redirect to="/Home" />;
  // } else {
  //   console.log(user);
  //   console.log("::::::::::::::::::::", !user);
  // }

  // const user = app.auth().currentUser;
  // setCurrentUser(user);
  // console.log("user::::", user);

  return (
    <Form
      style={{ maxWidth: "320px", paddingLeft: "25px", paddingTop: "10px" }}
      onSubmit={registerUser}
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formName">
          <Form.Control name="name" type="name" placeholder="Name" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control name="email" type="email" placeholder="Email" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
      </Form.Row>
      <Button
        type="submit"
        style={{ backgroundColor: PRIMARY_COLOR, marginBottom: "10px" }}
      >
        Submit
      </Button>
    </Form>
  );
};
