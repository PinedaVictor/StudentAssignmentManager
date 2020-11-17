import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { TodoCard } from "../Components/student-tools/todo-list/List";

const todoCard = [
  {
    title: "List",
    startDate: "02/20/20",
    endDate: "02/25/20",
    list: ["Item one", "Item two", "Item three"],
  },
];

export const TodoList: React.FC = () => {
  useEffect(() => {
    console.log("Insdie todo");
  }, []);
  return (
    <Container>
      <MainLayout />
      {todoCard.map((item, index) => (
        <TodoCard
          key={index}
          title={item.title}
          startDate={item.startDate}
          endDate={item.endDate}
          listItems={item.list}
        />
      ))}
    </Container>
  );
};
