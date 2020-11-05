import React, { useState } from "react";
import { create } from "ts-style";
import { PRIMARY_COLOR } from "../Styles/global";

import "../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  Container,
  // Media,
  ButtonGroup,
  // DropdownButton,
  // Dropdown,
  Button,
} from "react-bootstrap";
import { Home, Assignments, Homework, Courses, Exams } from "../Components/student-tools";


export const Main: React.FC = () => {
  const [tool, setTool] = useState(<Home/>);

  return (
    <Container 
    style = {styles.pageLayout} 
    fluid>

      <div style = {styles.navbarLayout}
      >
        <div style = {styles.iconStyle}>
          Icon
        </div>

        <div
        style = {{
          display: 'flex',
          backgroundColor: PRIMARY_COLOR,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >

          <Button
          style = {styles.linkStyle}
          onClick={() => setTool(<Home/>)}
          >
            Home
          </Button>

          <Button
          style = {styles.linkStyle}
          onClick={() => setTool(<Courses/>)}
          >
            Courses
          </Button>

          <Button
          style = {styles.linkStyle}
          onClick={() => setTool(<Homework/>)}
          >
            Homework
          </Button>
          <Button
            style = {styles.linkStyle}
            onClick={() => setTool(<Exams/>)}
          >
            Exams
          </Button>
        </div>

        <div
        style = {styles.iconStyle}
        >
          Bell
        </div>
      </div>

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
  );
};

const styles = create({
  pageLayout: {
    width: "100%", 
    height: "100%", 
    padding: 0
  },

  navbarLayout: {
    display: 'grid',
    gridTemplateColumns: '35px auto 35px',
    height: 35,
    backgroundColor: PRIMARY_COLOR,
    fontSize: 18,
    alignItems: 'center',
  },

  linkStyle: {
    display: 'flex',
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    height: 35,
    fontSize: 24,
    fontWeight: "bold" as "bold",
    color: 'black',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    border: '0px'
  },

    iconStyle: {
        backgroundColor: '#FF0000',
        height: 35
  }
});
