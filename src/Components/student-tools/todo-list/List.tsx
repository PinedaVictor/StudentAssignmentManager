import React, { useRef, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Card from "@material-ui/core/Card";
import { AQUA, SECONDARY_COLOR } from "../../../Styles/global";
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
  const [userInput, setUserInput] = useState("");
  const [todoItemIndex, setTodoItemIndex] = useState(0);

  const firebase_User = app.auth().currentUser;
  let currentUserID = "";
  if (firebase_User) {
    currentUserID = firebase_User.uid;
  }

  const classes = useStyles();
  const cardRef = app
    .firestore()
    .collection("users")
    .doc(currentUserID)
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

  const deleteTodoItem = async (itemIndex: number) => {
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        const todoList = cardData.todoList;
        let filteredList = todoList;
        if (itemIndex + 1 === todoList.length) {
          filteredList = todoList.slice(0, todoList.length - 1);
        } else if (itemIndex === 0) {
          filteredList = todoList.slice(itemIndex + 1, todoList.length);
        } else {
          filteredList = todoList
            .slice(0, itemIndex)
            .concat(todoList.slice(itemIndex + 1, todoList.length));
        }
        cardRef.update({ todoList: filteredList });
      }
    } catch (error) {
      console.log("Could not delete todo item", error);
    }
  };

  const setCompleteStatus = async (itemIndex: number) => {
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        const todoListUpdated = cardData.todoList;
        todoListUpdated[itemIndex] = {
          todo: todoListUpdated[itemIndex].todo,
          complete: !todoListUpdated[itemIndex].complete,
        };
        cardRef.update({ todoList: todoListUpdated });
      }
    } catch {
      console.log("Error setting todo item complete status");
    }
  };

  const editCardTitle = async () => {
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        cardRef.update({ title: userInput });
      }
    } catch {
      console.log("Could not updating title");
    }
  };

  const editCardDate = async () => {
    console.log("Card Date");
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        cardRef.update({ date: userInput });
      }
    } catch {
      console.log("Could not updating title");
    }
  };

  const editTodoItem = async () => {
    try {
      const cardDocument = await cardRef.get();
      const cardData = cardDocument.data();
      if (cardData) {
        const todoList = cardData.todoList;
        let updatedTodoList = [];
        for (let i = 0; i < todoList.length; i++) {
          updatedTodoList.push(todoList[i]);
          if (i === todoItemIndex) {
            const tempOBJ = todoList[i];
            updatedTodoList[i] = {
              todo: userInput,
              complete: tempOBJ.complete,
            };
          }
        }
        cardRef.update({ todoList: updatedTodoList });
      }
    } catch {
      console.log("Could not update todo item");
    }
  };

  const deleteTodoCard = () => {
    try {
      app
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("TODOs")
        .doc(props.cardID)
        .delete();
    } catch {
      console.log("Did not delete todo card");
    }
  };

  return (
    <Card
      style={{
        marginBottom: "15px",
        backgroundColor: SECONDARY_COLOR,
        color: "white",
      }}
    >
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
              saveText={editCardTitle}
            >
              <div>
                <InputGroup>
                  <FormControl
                    ref={cardTitleRef}
                    maxLength={15}
                    minLength={8}
                    defaultValue={props.title}
                    onChange={(e) => {
                      setUserInput(e.target.value);
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
              saveText={editCardDate}
            >
              <div>
                <InputGroup>
                  <FormControl
                    ref={cardDateRef}
                    maxLength={15}
                    minLength={1}
                    defaultValue={props.date}
                    onChange={(e) => {
                      setUserInput(e.target.value);
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
              style={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50px",
                color: "white",
              }}
            />
          </IconButton>
        </div>
      </div>
      <div
        style={{ height: "3px", width: "100%", backgroundColor: AQUA }}
      ></div>
      <List className={classes.root}>
        {props.listItems.map((item, index) => {
          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              style={{ backgroundColor: "" }}
            >
              <div style={{ fontSize: "17px" }}>{`${index + 1}.`}</div>
              <div
                style={{
                  backgroundColor: item.complete ? "#04bf7b" : SECONDARY_COLOR,
                  color: item.complete ? SECONDARY_COLOR : "white",
                  width: "87%",
                  height: "100%",
                  borderRadius: "10px",
                  fontSize: "17px",
                }}
              >
                <Editable
                  style={{
                    backgroundColor: "",
                    marginLeft: "5px",
                  }}
                  text={item.todo}
                  placeholder="Todo"
                  childref={todoItemRef}
                  type="input"
                  saveText={editTodoItem}
                >
                  <div>
                    <InputGroup>
                      <FormControl
                        ref={todoItemRef}
                        maxLength={35}
                        minLength={1}
                        defaultValue={item.todo}
                        onChange={(e) => {
                          setTodoItemIndex(index);
                          setUserInput(e.target.value);
                        }}
                      ></FormControl>
                    </InputGroup>
                  </div>
                </Editable>
              </div>
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => setCompleteStatus(index)}>
                  <CheckCircleOutlineIcon
                    style={{
                      color: item.complete ? "#04bf7b" : "white",
                      width: "1.3em",
                      height: "1.3em",
                      borderRadius: "50px",
                    }}
                  />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTodoItem(index)}>
                  <ClearIcon
                    style={{
                      width: "1.3em",
                      height: "1.3em",
                      borderRadius: "50px",
                      color: "white",
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <IconButton onClick={addTodoItem}>
        <AddIcon style={{ width: "1.5em", height: "1.5em", color: AQUA }} />
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
