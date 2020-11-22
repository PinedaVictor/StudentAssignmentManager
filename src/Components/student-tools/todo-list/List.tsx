import React, { useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import Checkbox from "@material-ui/core/Checkbox";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
// import BackspaceIcon from "@material-ui/icons/Backspace";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import { FormControl, InputGroup } from "react-bootstrap";
import { Editable } from "../../ReusableParts/InlineEdit";

interface TodoListProps {
  title: string;
  date: string;
  listItems: { todo: string; complete: boolean }[];
}

export const TodoCard: React.FC<TodoListProps> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const cardTitleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cardDateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const todoItemRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log("Calling handleToggle::::::CHecked?", value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
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
          <IconButton>
            <DeleteIcon
              style={{ width: "1.5em", height: "1.5em", color: "#D9042B" }}
            />
          </IconButton>
        </div>
      </div>
      <List className={classes.root}>
        {props.listItems.map((item, index) => {
          const labelId = `checkbox-list-label-${item}`;
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
                <IconButton edge="end">
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
      <IconButton>
        <AddIcon style={{ width: "1.5em", height: "1.5em" }} />
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
