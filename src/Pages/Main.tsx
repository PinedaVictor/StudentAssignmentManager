import React, { useState } from "react";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../Styles/global";
import "../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Container, ButtonGroup, Row, Button } from "react-bootstrap";
import { Assignments, Courses } from "../Components/student-tools";

export const Home: React.FC = () => {
  const [tool, setTool] = useState(<Assignments />);

  return (
    <>
      <Container fluid>
        <Row
          style={{
            backgroundColor: PRIMARY_COLOR,
            display: "flex",
            maxHeight: "120px",
          }}
        >
          {/* TODO: */}
          {/* <Media>
            <img
              alt="Logo"
              style={{ height: "100px", width: "150px", padding: "10px" }}
              src={require("")}
            />
          </Media> */}
          <ButtonGroup
            style={{
              padding: "10px",
              paddingLeft: "3em",
              paddingTop: "3.8em",
            }}
          >
            <Button
              onClick={() => {
                setTool(<Assignments />);
              }}
              style={styles.button}
            >
              <p style={styles.buttonTitle}>Assignments</p>
            </Button>
            <Button
              onClick={() => {
                setTool(<Courses />);
              }}
              style={styles.button}
            >
              <p style={styles.buttonTitle}>Courses</p>
            </Button>
            {/* TODO: Add more tools and abstract buttons to a function */}
            <Button style={styles.button}>
              <p style={styles.buttonTitle}>. . .</p>
            </Button>
            {/* Note: Dropdown menu for later use */}
            {/* <DropdownButton
              style={styles.button}
              as={ButtonGroup}
              title="Dropdown"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton> */}
          </ButtonGroup>
          {/* TODO: Implement search function */}
          {/* <Form inline>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
        </Row>
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "0",
            padding: "0",
          }}
        >
          {tool}
        </div>
      </Container>
    </>
  );
};

const styles = create({
  button: {
    width: "8em",
    backgroundColor: "white",
    marginRight: "3px",
  },
  buttonTitle: {
    color: PRIMARY_COLOR,
    margin: "0",
    padding: "0",
  },
});
