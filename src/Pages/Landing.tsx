import React, { useState } from "react";
import { Container, Row, Card, Button, ButtonGroup } from "react-bootstrap";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../Styles/global";
import { LoginForm } from "../Components/user-registration/Login";
import { SignUpForm } from "../Components/user-registration/SignUp";

export const Landing: React.FC = () => {
  const [form, toggleForms] = useState(true);

  function toggleSignUp() {
    if (form) {
      toggleForms(false);
    }
  }

  function toggleLogin() {
    if (!form) {
      toggleForms(true);
    }
  }
  return (
    <>
      <Container fluid style={{ backgroundColor: "" }}>
        <Row style={styles.header}>
          {/* TODO: */}
          {/* <Media style={{ margin: "auto" }}>
            <img
              alt="Logo"
              style={{ width: "100%", maxWidth: "350px" }}
              src={require("")}
            />
          </Media> */}
        </Row>
        <Row style={styles.loginRow}>
          <Card style={styles.userLogin}>
            <Card.Title style={styles.cardTitle}>SAM</Card.Title>
            <ButtonGroup
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button style={styles.buttons} onClick={() => toggleLogin()}>
                <p style={styles.buttonText}>Login</p>
              </Button>
              <div style={{ width: "2em" }}></div>
              <Button style={styles.buttons} onClick={() => toggleSignUp()}>
                <p style={styles.buttonText}>Register</p>
              </Button>
            </ButtonGroup>
            <Card.Body>{form ? <LoginForm /> : <SignUpForm />}</Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

const styles = create({
  header: {
    backgroundColor: PRIMARY_COLOR,
    display: "flex",
    height: "100px",
  },
  buttons: {
    height: "3em",
    width: "8em",
  },
  buttonText: {
    fontSize: "20px",
  },
  userLogin: {
    backgroundColor: "white",
    border: "2px solid",
    borderColor: PRIMARY_COLOR,
    maxWidth: "25em",
    width: "100%",
    borderRadius: "10%",
    margin: "auto",
  },
  loginRow: {
    display: "block" as "block",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    height: "300px",
    width: "100%",
    margin: "auto",
    paddingTop: "5em",
  },
  cardTitle: {
    fontSize: "2em",
    textAlign: "center" as "center",
    color: PRIMARY_COLOR,
  },
});
