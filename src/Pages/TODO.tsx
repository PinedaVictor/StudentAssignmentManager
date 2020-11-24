import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { AQUA } from "../Styles/global";
import { Container } from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { TodoCard } from "../Components/student-tools/todo-list/List";
import { app } from "../Database/initFirebase";

// TODO:
// Setup firebase listener
// Implement card editing - remove todo items

interface TodoCard {
  title: string;
  date: string;
  todoList: { todo: string; complete: boolean }[];
  cardID: string;
}

export const TodoList: React.FC = () => {
  const [todoCards, setTodoCards] = useState<TodoCard[]>([]);

  const setToDoList = async () => {
    try {
      const toDoList = await app
        .firestore()
        .collection("users")
        .doc("iaswHXNT2MSNXarjGKcs51g64R32") //TODO: update with current user ID
        .collection("TODOs")
        .orderBy("dateCreated", "desc")
        .get();

      const tempTodoList: TodoCard[] = [];
      toDoList.forEach((document) => {
        const todoData = document.data();
        if (todoData) {
          const listData = {
            title: todoData.title,
            date: todoData.date,
            todoList: todoData.todoList,
            cardID: document.id,
          };
          tempTodoList.push(listData);
        }
      });
      console.log("Temp list::::", tempTodoList);
      setTodoCards(tempTodoList);
    } catch {
      console.log("Error loading TODOs");
    }
  };

  const addTodoCard = async () => {
    const date = Date();
    console.log("Current Date::", date);
    try {
      await app
        .firestore()
        .collection("users")
        .doc("iaswHXNT2MSNXarjGKcs51g64R32")
        .collection("TODOs")
        .doc()
        .set({
          title: "Click to edit",
          date: "^^^^^ :)",
          dateCreated: Date(),
          todoList: [{ todo: "HI :)", complete: false }],
        });
      console.log("Card was Addded successfuly");
    } catch {
      console.log("Error creating new card");
    }
  };

  return (
    <Container>
      <MainLayout />
      <button style={{ marginBottom: "10px" }} onClick={setToDoList}>
        {"Click"}
      </button>
      <div style={{ display: "flex", marginTop: "-40px" }}>
        <h3 style={{ backgroundColor: "", color: AQUA, width: "95%" }}>
          TODOs
        </h3>
        <IconButton
          onClick={addTodoCard}
          style={{
            marginTop: "10px",
          }}
        >
          <AddIcon
            style={{ width: "1.5em", height: "1.5em", color: "white" }}
          />
        </IconButton>
      </div>
      <div
        style={{
          height: "5px",
          backgroundColor: AQUA,
          marginTop: "-10px",
          marginBottom: "15px",
          borderRadius: "25px",
        }}
      ></div>
      {todoCards.map((item, index) => (
        <TodoCard
          key={index}
          title={item.title}
          date={item.date}
          listItems={item.todoList}
          cardID={item.cardID}
        />
      ))}
    </Container>
  );
};
