import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
// import CommentIcon from "@material-ui/icons/Comment";
import Card from "@material-ui/core/Card";

interface TodoListProps {
  title: string;
  startDate: string;
  endDate: string;
  listItems: { title: string; complete: boolean }[];
}

export const TodoCard: React.FC<TodoListProps> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

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
          <p>Title: {props.title}</p>
          <p>Start Date: {props.startDate}</p>
          <p>End Date: {props.endDate}</p>
        </div>
        <div
          style={{
            backgroundColor: "",
            float: "right",
          }}
        >
          <IconButton>
            <DeleteIcon style={{ width: "1.5em", height: "1.5em" }} />
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
              button
              onClick={handleToggle(index)}
              style={{ backgroundColor: "" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  size="medium"
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              {item.complete ? (
                <s>{item.title}</s>
              ) : (
                <p
                  style={{
                    fontSize: "16px",
                    paddingLeft: "0px",
                    margin: "0px",
                    backgroundColor: "",
                    fontFamily: "helvetica",
                  }}
                >
                  {item.title}
                </p>
              )}
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          );
        })}
      </List>
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
      // display: "flex",
    },
  })
);
