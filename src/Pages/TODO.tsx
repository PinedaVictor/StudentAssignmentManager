import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
export const TodoList: React.FC = () => {
  useEffect(() => {
    console.log("Insdie todo");
  }, []);
  return (
    <Container>
      <MainLayout />
      <p>I am the the todo </p>
    </Container>
  );
};
