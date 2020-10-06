import React from "react";
import { Container, Row, Card } from "react-bootstrap";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../Styles/global";
import { LoginForm } from "../Components/Login";

export const Landing: React.FC = () => {
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
            <Card.Body>
              <LoginForm />
            </Card.Body>
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
  userLogin: {
    backgroundColor: "white",
    border: "2px solid",
    borderColor: PRIMARY_COLOR,
    maxWidth: "25em",
    width: "100%",
    borderRadius: "3px",
    margin: "auto",
    height: "22em",
    display: "block",
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
