import React from "react";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../Styles/global";
import { Form, Button } from "react-bootstrap";
// TODO:
// import { Redirect } from "react-router";
// import { ath } from "../Database/initFirebase";
// import { AuthContext } from "../Database/Auth";

export const LoginForm: React.FC = () => {
  // const user = ath.currentUser;
  // const HandleLogin = useCallback(async (event) => {
  //   event.preventDefault();
  //   const { email, password } = event.target.elements;
  //   try {
  //     await ath.signInWithEmailAndPassword(email.value, password.value);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }, []);

  return (
    <Form
      style={{ maxWidth: "320px", paddingLeft: "25px" }}
      onSubmit={() => console.log("Login button clicked")}
    >
      <Form.Group style={styles.group} controlId="Email">
        <Form.Control
          style={styles.control}
          name="email"
          type="email"
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group style={styles.group} controlId="Password">
        <Form.Control
          style={styles.control}
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group style={styles.group} controlId="formBasicCheckbox">
        <Form.Check
          style={{ display: "block", paddingLeft: "0.5em" }}
          type="checkbox"
          label="remember me"
        />
      </Form.Group>
      <Button size="lg" style={styles.loginButton} type="submit">
        Log In
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
  },
  loginButton: {
    margin: "auto",
    display: "block",
    border: "none",
    width: "15em",
    height: "3em",
    marginTop: "10px",
    backgroundColor: PRIMARY_COLOR,
    color: "white",
  },
});
