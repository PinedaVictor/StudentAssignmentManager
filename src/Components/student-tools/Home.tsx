import React, { useState } from "react";

import { BORDER_COLOR, BORDER_COLOR_HOVER, ICON_BORDER, ICON_BORDER_HOVER, PRIMARY_COLOR, SECONDARY_COLOR } from "../../Styles/global";
import { Container, Grid, IconButton, makeStyles, Slide } from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";
import { CustomCardProgress } from "../ReusableParts/CustomCardProgress";
import { CustomPopup } from "../ReusableParts/CustomPopup";
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import SettingsIcon from '@material-ui/icons/Settings';
import { CustomTable } from "../ReusableParts/CustomTable";

const classData = [
  {
    id: 1,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
    Quizzes: 45
  },
  {
    id: 2,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
    Quizzes: 45
  },
  {
    id: 3,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
    Quizzes: 45
  },
  {
    id: 4,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
    Quizzes: 45
  },
  {
    id: 5,
    Name: "Phil 101",
    Total: 70,
    Homework: 30,
    Exams: 65,
    Projects: 100,
    Quizzes: 45
  },
];

const assignmentsData = [
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
  {
    id: 1,
    class: "Phil 101",
    name: "homework 1",
    dueBy: "12/05",
    duration: "2 hours",
    priority: 3,
    sectionWeight: "20%",
    overallWeight: "5%",
  },
];

const tableColumns = [
  "Class",
  "Assignment",
  "Due By",
  "Duration",
  "Priority",
  "Section Weight",
  "Overall Weight",
];

export const Home: React.FC = () => {
  const classes = useStyles()

  const [toolbarSelection, setToolbarSelection] = useState(0)
  const [slideStates, setSlideStates] = useState([true, false])
  const [settingsModal, setSettingsModal] = useState(false);

  const handleToolbarNav = (event: React.ChangeEvent<{}>, newValue: number) => {
    let slidersTemp = slideStates
    slidersTemp[newValue] = !slidersTemp[newValue]
    slidersTemp[toolbarSelection] = !slidersTemp[toolbarSelection]
    
    setSlideStates(slidersTemp)
    setToolbarSelection(newValue);
  };

  const handleSettingsModal = () => {
    setSettingsModal(true)
  }

  const progressSection = (
    <Grid container direction = "row" spacing = {3}>
      {classData.map((item) => (
        <Grid item xs = {12} sm = {6} md = {6} lg = {4} xl = {4}>
          <CustomCardProgress
          title = {item.Name}
          data = {{
            Total: item.Total,
            Homework: item.Homework,
            Projects: item.Projects,
            Exams: item.Exams,
            Quizzes: item.Quizzes
          }}
          />
        </Grid>
      ))}
    </Grid>
  )

  const taskSection = (
    <Grid item xs = {12} className = {classes.tableRoot}>
      <CustomTable
      data = {assignmentsData}
      headerText = {tableColumns}
      />
    </Grid>
  )

  const progressModal = (
    <form  className = {classes.modalWindow}>

    </form>
  )

  const taskModal = (
    <form  className = {classes.modalWindow}>

    </form>
  )

  return (
    <Container style = {{width: "80%"}}>
      <Grid container direction = "column" justify = "center" alignItems = "center" spacing = {4}>

        <Grid item xs = {12}>
          <Grid container direction = "row" justify = "center" alignItems = "center">
                      
            <Grid item xs = {3}>
              <IconButton>
                <SettingsIcon
                className = {classes.settingsRoot}
                onClick = {handleSettingsModal}
                />
              </IconButton>
              
            </Grid>

            <Grid item xs = {9}>
              <CustomScrollableTabs
              className={classes.toolbarRoot}
              tabValue={toolbarSelection}
              onChange={handleToolbarNav}
              tabNames={["Course Progress", "Task List"]}
              />
            </Grid>
            
          </Grid>
        </Grid>

        <Grid item xs = {12}>
          <Slide direction = "left" in = {slideStates[0]} timeout = {{enter: 500, exit: 100}} mountOnEnter unmountOnExit>
            {progressSection}
          </Slide>

          <Slide direction = "right" in = {slideStates[1]} timeout = {{enter: 500, exit: 100}} mountOnEnter unmountOnExit>
            {taskSection}
          </Slide>
          
        </Grid>
        

      </Grid>
      
      <CustomPopup
      modalState = {settingsModal}
      layout = {(toolbarSelection == 0) ? progressModal : taskModal}
      />

    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  modalWindow: {
    margin: theme.spacing(2),
    width: "auto",
    color: "white"
  },

  toolbarRoot: {
    background: SECONDARY_COLOR,
    color: 'white',
    borderRadius: 10,
    border: "solid 1px",
    borderColor: BORDER_COLOR,

    "&:hover": {
      transition: "all .35s ease",
      border: "solid 1px",
      borderColor: BORDER_COLOR_HOVER,
    }
  },

  linearBarRoot: {
    width: "100%",
    height: "100%"
  },

  settingsRoot: {
    width: "2.75em", 
    height: "2.75em",
    stroke: ICON_BORDER,
    strokeWidth: "0.75",
    opacity: 0.75,
    fill: SECONDARY_COLOR,

    '&:hover': {
      opacity: 1,
      width: "3em",
      height: "3em",
      stroke: ICON_BORDER_HOVER,
      strokeWidth: "0.75",
    }
  },

  tableRoot: {
    display: "flex",
    height: "70vh",
    overflowY: "scroll"
  }
}));
