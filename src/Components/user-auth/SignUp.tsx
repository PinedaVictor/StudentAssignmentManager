import React, { useContext, useCallback } from "react";
import { create } from "ts-style";
import {
  PRIMARY_COLOR,
  FILL_OUT_FORM_BACKGROUND_FILL_COLOR,
  AQUA,
} from "../../Styles/global";
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
            history.push("/");
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

  return (
    <Form
      style={{ maxWidth: "320px", paddingLeft: "25px", paddingTop: "10px" }}
      onSubmit={registerUser}
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formName">
          <Form.Control
            name="name"
            type="name"
            placeholder="Name"
            style={styles.control}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            style={styles.control}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            style={styles.control}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            style={styles.control}
          />
        </Form.Group>
      </Form.Row>
      <Button
        type="submit"
        style={{
          backgroundColor: AQUA,
          color: PRIMARY_COLOR,
          marginBottom: "10px",
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

const styles = create({
  group: {
    paddingTop: "10px",
  },
  control: {
    height: "3em",
    display: "block",
    margin: "auto",
    color: "white",
    backgroundColor: FILL_OUT_FORM_BACKGROUND_FILL_COLOR,
    border: "none",
  },
});
