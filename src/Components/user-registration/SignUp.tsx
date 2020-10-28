import React, { useContext, useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../../Styles/global";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { app } from "../../Database/initFirebase";
import { AuthContext } from "./AuthProvider";

export const SignUpForm: React.FC = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  // setCurrentUser({ name: "Victor" });
  // TODO: any vs unknown
  // TODO: event type:
  const registerUser = async (event: any) => {
    event.preventDefault();
    console.log("Calling Register User");
    const { Name, Email } = event.target.elements;
    console.log("Name: ", Name.value, " Email: ", Email.value);

    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(Name.value, Email.value)
        .then((userCredentials) => {
          app
            .firestore()
            .collection("users")
            .doc(userCredentials.user?.uid)
            .set({
              name: Name.value,
              email: Email.value,
            });
        });
      setCurrentUser({ name: Name.value, email: Email.value });
    } catch {
      console.log("Error signing up user");
    }
  };

  if (currentUser === null) {
    console.log("User:::", currentUser);
  } else {
    console.log("::::::::::::::::::::");
  }

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
          <Form.Control name="Name" type="name" placeholder="Name" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control name="Email" type="email" placeholder="Email" />
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
