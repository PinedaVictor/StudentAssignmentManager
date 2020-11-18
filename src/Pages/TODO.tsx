import React from "react";
import { Container } from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { TodoCard } from "../Components/student-tools/todo-list/List";

const todoCard = [
  {
    title: "List",
    startDate: "02/20/20",
    endDate: "02/25/20",
    list: [
      { title: "Item One", complete: false },
      { title: "Item Two", complete: false },
      { title: "Item three", complete: false },
    ],
  },
  {
    title: "List",
    startDate: "02/20/20",
    endDate: "02/25/20",
    list: [
      { title: "Item One", complete: false },
      { title: "Item Two", complete: false },
      { title: "Item three", complete: false },
    ],
  },
  {
    title: "List",
    startDate: "02/20/20",
    endDate: "02/25/20",
    list: [
      { title: "Item One", complete: false },
      { title: "Item Two", complete: false },
      { title: "Item three", complete: false },
    ],
  },
];

export const TodoList: React.FC = () => {
  return (
    <Container>
      <MainLayout />
      <h3 style={{ backgroundColor: "", marginTop: "-20px" }}>TODO List</h3>
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
