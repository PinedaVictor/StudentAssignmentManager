import React, { useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import { FormControl, InputGroup } from "react-bootstrap";
import { Editable } from "../../ReusableParts/InlineEdit";
import { app } from "../../../Database/initFirebase";

interface TodoListProps {
  title: string;
  date: string;
  listItems: { todo: string; complete: boolean }[];
  cardID: string;
}

export const TodoCard: React.FC<TodoListProps> = (props) => {
  const classes = useStyles();
  const cardRef = app
    .firestore()
    .collection("users")
    .doc("iaswHXNT2MSNXarjGKcs51g64R32")
    .collection("TODOs")
    .doc(props.cardID);

  const cardTitleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cardDateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const todoItemRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const addTodoItem = async () => {
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        const todoList = cardData.todoList;
        const addedOneTodo = todoList.concat([
          { todo: "edit", complete: false },
        ]);
        cardRef.update({ todoList: addedOneTodo });
      }
    } catch {
      console.log("Error updating todo card");
    }
  };

  // TODO:
  // const deleteTodoItem = async (itemIndex: number) => {
  //   console.log("Calling delele todo item::::", itemIndex);

  //   try {
  //     const cardDocument = await cardRef.get();
  //     const cardData = cardDocument.data();
  //     if (cardData) {
  //       const todoList = cardData.todoList;
  //       let filteredItems = todoList;
  //       if (itemIndex == todoList.length) {
  //         filteredItems = todoList.pop();
  //         console.log("First case");
  //       } else if (itemIndex == 0) {
  //         filteredItems = todoList.shift();
  //         console.log("Second case");
  //       } else {
  //         filteredItems = todoList
  //           .slice(0, itemIndex)
  //           .concat(itemIndex, todoList.length);
  //         console.log("Third case");
  //       }
  //       console.log("new items:::", filteredItems);
  //       cardRef.update({ todoList: filteredItems });
  //     }
  //   } catch {
  //     console.log("Could not delete todo item");
  //   }
  // };

  const deleteTodoCard = () => {
    try {
      app
        .firestore()
        .collection("users")
        .doc("iaswHXNT2MSNXarjGKcs51g64R32")
        .collection("TODOs")
        .doc(props.cardID)
        .delete();
      console.log("Deleted todo card successfully");
    } catch {
      console.log("Did not delete todo card");
    }
  };

  return (
    <Card style={{ marginBottom: "15px" }}>
      <div style={{ display: "flex" }}>
        <div
          className={classes.cardHeader}
          style={{ backgroundColor: "", width: "95%" }}
        >
          <div style={{ display: "flex" }}>
            <p>Title:</p>
            <Editable
              style={{ backgroundColor: "", marginLeft: "5px" }}
              text={props.title}
              placeholder="Title"
              childref={cardTitleRef}
              type="input"
              saveText={() => console.log("The")}
            >
              <div>
                <InputGroup>
                  <FormControl
                    ref={cardTitleRef}
                    maxLength={15}
                    minLength={8}
                    defaultValue={props.title}
                    onChange={(e) => {
                      // setUserNameInput(e.target.value);
                      console.log("The form event:::", e);
                    }}
                  ></FormControl>
                </InputGroup>
              </div>
            </Editable>
          </div>
          <div style={{ display: "flex" }}>
            <p>Date:</p>
            <Editable
              style={{ backgroundColor: "", marginLeft: "5px" }}
              text={props.date}
              placeholder="Date"
              childref={cardDateRef}
              type="input"
              saveText={() => console.log("The")}
            >
              <div>
                <InputGroup>
                  <FormControl
                    ref={cardDateRef}
                    maxLength={15}
                    minLength={8}
                    defaultValue={props.date}
                    onChange={(e) => {
                      // setUserNameInput(e.target.value);
                      console.log("The form event:::", e);
                    }}
                  ></FormControl>
                </InputGroup>
              </div>
            </Editable>
          </div>
        </div>
        <div>
          <IconButton onClick={deleteTodoCard}>
            <DeleteIcon
              style={{ width: "1.5em", height: "1.5em", color: "#D9042B" }}
            />
          </IconButton>
        </div>
      </div>
      <div
        style={{ height: "3px", width: "100%", backgroundColor: "#1c588c" }}
      ></div>
      <List className={classes.root}>
        {props.listItems.map((item, index) => {
          // const labelId = `checkbox-list-label-${item}`;
          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              style={{ backgroundColor: "" }}
            >
              <div>{`${index + 1}.`}</div>
              <div
                style={{
                  backgroundColor: item.complete ? "#04bf7b" : "white",
                  color: item.complete ? "white" : "black",
                  width: "87%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              >
                <Editable
                  style={{ backgroundColor: "", marginLeft: "5px" }}
                  text={item.todo}
                  placeholder="Todo"
                  childref={todoItemRef}
                  type="input"
                  saveText={() => console.log("The")}
                >
                  <div>
                    <InputGroup>
                      <FormControl
                        ref={todoItemRef}
                        maxLength={35}
                        minLength={1}
                        defaultValue={item.todo}
                        onChange={(e) => {
                          // setUserNameInput(e.target.value);
                          console.log("The form event:::", e);
                        }}
                      ></FormControl>
                    </InputGroup>
                  </div>
                </Editable>
              </div>
              <ListItemSecondaryAction style={{ backgroundColor: "" }}>
                <IconButton edge="end">
                  <CheckCircleIcon
                    style={{
                      color: item.complete ? "#04bf7b" : "grey",
                      width: "1.3em",
                      height: "1.3em",
                    }}
                  />
                </IconButton>
                <IconButton edge="end" onClick={() => console.log("Clicking")}>
                  <HighlightOffIcon
                    style={{
                      width: "1.3em",
                      height: "1.3em",
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <IconButton onClick={addTodoItem}>
        <AddIcon
          style={{ width: "1.5em", height: "1.5em", color: "#04bf7b" }}
        />
      </IconButton>
    </Card>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      paddingTop: "0px",
    },
    cardHeader: {
      fontSize: "18px",
      paddingLeft: "10px",
      paddingTop: "10px",
      fontFamily: "helvetica",
    },
  })
);
