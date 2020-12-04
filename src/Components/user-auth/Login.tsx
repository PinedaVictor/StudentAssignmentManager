import React, { useCallback, useContext } from "react";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../../Styles/global";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { app } from "../../Database/initFirebase";
import { AuthContext } from "./AuthProvider";

export const LoginForm: React.FC = () => {
  const [, setUser] = useContext(AuthContext);
  const history = useHistory();
  const HandleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => {
            setUser(app.auth().currentUser);
          });
        history.push("/");
      } catch (error) {
        alert(error);
      }
      console.log("Finished authenticating user");
    },
    [history, setUser]
  );

  return (
    <Form
      style={{ maxWidth: "320px", paddingLeft: "25px" }}
      onSubmit={HandleLogin}
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
      <Button
        type="submit"
        style={{ backgroundColor: PRIMARY_COLOR, marginBottom: "10px" }}
      >
        Login
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
