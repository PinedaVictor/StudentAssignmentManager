import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { AQUA, SECONDARY_COLOR } from "../Styles/global";
import { Container } from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { TodoCard } from "../Components/student-tools/todo-list/List";
import { app } from "../Database/initFirebase";
interface TodoCard {
  title: string;
  date: string;
  todoList: { todo: string; complete: boolean }[];
  cardID: string;
}

export const TodoList: React.FC = () => {
  const [todoCards, setTodoCards] = useState<TodoCard[]>([]);

  const firebase_User = app.auth().currentUser;
  let currentUserID = "";
  if (firebase_User) {
    currentUserID = firebase_User.uid;
  }

  useEffect(() => {
    const todoList = app
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("TODOs")
      .orderBy("dateCreated", "desc")
      .onSnapshot((querySnapshot) => {
        const clintList: TodoCard[] = [];
        querySnapshot.forEach((document) => {
          const cardData = document.data();
          if (cardData) {
            const temppCardData = {
              title: cardData.title,
              date: cardData.date,
              todoList: cardData.todoList,
              cardID: document.id,
            };
            clintList.push(temppCardData);
          }
        });
        setTodoCards(clintList);
      });
    return () => todoList();
  }, []);

  const addTodoCard = async () => {
    try {
      await app
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("TODOs")
        .doc()
        .set({
          title: "Click to edit",
          date: "-------",
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
            style={{
              width: "1.5em",
              height: "1.5em",
              color: "white",
              borderRadius: "50px",
              backgroundColor: SECONDARY_COLOR,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          height: "5px",
          backgroundColor: AQUA,
          marginTop: "-5px",
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
