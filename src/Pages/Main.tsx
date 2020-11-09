import React, { useState } from "react";
import "../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Container } from "react-bootstrap";
import { TodoList } from "../Components/student-tools/index";
import { Header } from "../Navigation/Header";

export const MainUI: React.FC = () => {
  const [StudentTool, setStudentTool] = useState<React.FC>(TodoList);

  const handleNavItemClick = (Component: React.FC) => {
    setStudentTool(Component);
  };

  return (
    <Container fluid>
      <Header navItemFunction={handleNavItemClick} />
      {StudentTool}
    </Container>
  );
};
