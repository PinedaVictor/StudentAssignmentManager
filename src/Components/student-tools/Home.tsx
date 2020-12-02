import React, { useState } from "react";

import { BORDER_COLOR, BORDER_COLOR_HOVER, ICON_BORDER, ICON_BORDER_HOVER, SECONDARY_COLOR } from "../../Styles/global";
import { Collapse, Container, Grid, IconButton, makeStyles, Slide } from "@material-ui/core";
import { CustomCardProgress } from "../ReusableParts/CustomCardProgress";
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import SettingsIcon from '@material-ui/icons/Settings';
import { CustomTable } from "../ReusableParts/CustomTable";
import { CustomCheckbox } from "../ReusableParts/CustomCheckbox";

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
  const [settingsState, setSettingsState] = useState(false);
  const [progressSettings, setProgressSettings] = useState({
    checkbox1: false
  })

  const handleToolbarNav = (event: React.ChangeEvent<{}>, newValue: number) => {
    let slidersTemp = slideStates
    slidersTemp[newValue] = !slidersTemp[newValue]
    slidersTemp[toolbarSelection] = !slidersTemp[toolbarSelection]
    
    setSlideStates(slidersTemp)
    setToolbarSelection(newValue);
  };

  const progressSection = (
    <Grid container direction = "row" spacing = {3}>
      {classData.map((item) => (
        <Grid key = {"progGrid-" + `${item.id}`} item xs = {12} sm = {6} md = {6} lg = {4} xl = {4}>
          <CustomCardProgress
          key = {"progItem-" + `${item.id}`}
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
    <Grid key = "taskContainer" item xs = {12} className = {classes.tableRoot}>
      <CustomTable
      key = "taskTable"
      data = {assignmentsData}
      headerText = {tableColumns}
      />
    </Grid>
  )

  const progressModal = (
    <Grid container direction = "row" spacing = {4} className = {classes.settingsGrid}>
      <Grid item xs = {3}>
        <CustomCheckbox
        label = "checkbox 1"
        state = {progressSettings.checkbox1}
        onChange = {() => handleProgressSettingCheck("checkbox1")}
        />
      </Grid>
    </Grid>
  )

  const taskModal = (
    <Grid container direction = "row" spacing = {4}>
      <Grid item xs = {3}>
        <CustomCheckbox
        label = "checkbox 1"
        state = {progressSettings.checkbox1}
        onChange = {() => handleProgressSettingCheck("checkbox1")}
        />
      </Grid>
    </Grid>
  )

  const handleProgressSettingCheck = (target: "checkbox1") => {
    let settings = Object.assign({}, progressSettings)

    settings[target] = !settings[target]

    setProgressSettings(settings)
  }

  return (
    <Container style = {{width: "80%"}}>
      <Grid container direction = "column" justify = "center" alignItems = "center" spacing = {4}>

        
        <Grid key = "controlsContainer" item xs = {12}>
          <Grid container direction = "row" justify = "center" alignItems = "center">
                      
            <Grid key = "settingsIcon" item xs = {3}>
              <IconButton onClick = {() => setSettingsState((prev) => (!prev))}>
                <SettingsIcon className = {classes.settingsRoot}/>
              </IconButton>
            </Grid>

            <Grid key = "tabBar" item xs = {9}>
              <CustomScrollableTabs
              className={classes.toolbarRoot}
              tabValue={toolbarSelection}
              onChange={handleToolbarNav}
              tabNames={["Course Progress", "Task List"]}
              />
            </Grid>
            
          </Grid>
        </Grid>

        <Collapse in = {settingsState} timeout = {{enter: 100, exit: 100}} disableStrictModeCompat>
          {(toolbarSelection === 0) ? progressModal : taskModal}
        </Collapse>
        
        <Grid key = "sliderSection" item xs = {12}>
          <Slide key = "slider-progress" direction = "left" in = {slideStates[0]} timeout = {{enter: 500, exit: 100}} mountOnEnter unmountOnExit>
            {progressSection}
          </Slide>

          <Slide key = "slider-tasks" direction = "right" in = {slideStates[1]} timeout = {{enter: 500, exit: 100}} mountOnEnter unmountOnExit>
            {taskSection}
          </Slide>
          
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  settingsGrid: {
    width: "auto",
    color: "white",
    border: "solid 1px",
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    backgroundColor: SECONDARY_COLOR,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
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
