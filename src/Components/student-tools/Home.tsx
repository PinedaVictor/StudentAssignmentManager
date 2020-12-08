import React, { useEffect, useState } from "react";
import { app } from "../../Database/initFirebase"
import nextId from "react-id-generator";

import { BORDER_COLOR, BORDER_COLOR_HOVER, ICON_BORDER, ICON_BORDER_HOVER, SECONDARY_COLOR } from "../../Styles/global";
import { Collapse, Container, Grid, IconButton, makeStyles, Slide } from "@material-ui/core";
import { CustomCardProgress } from "../ReusableParts/CustomCardProgress";
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import SettingsIcon from '@material-ui/icons/Settings';
import { CustomTable } from "../ReusableParts/CustomTable";
import { CustomCheckbox } from "../ReusableParts/CustomCheckbox";

const tableColumns = [
  "Class",
  "Assignment",
  "Due By",
  "Priority",
  "Section Weight",
  "Overall Weight",
];

interface DataStructure {
  title: string,
  class: string,
  DateDue: string,
  grade: number,
  section_weight: number
}

interface CourseData {
  title: string,
  priority: number,
  gradeScale: {
    A: number,
    B: number,
    C: number,
    D: number
  },
  gradeWeights: {
    homeworkWeight: number,
    projectWeight: number,
    examWeight: number
  }
}

interface ProgressData {
  title: string,
  total: number,
  homework: number,
  project: number,
  exam: number
}

interface TaskData {
  course: string,
  title: string,
  dueBy: string,
  priority: number,
  sectionWeight: number,
  overallWeight: number
}

function emptyData(): DataStructure {
  return {
    title: "",
    class: "",
    DateDue: "",
    grade: -1,
    section_weight: 0
  }
}

function emptyCourseData(): CourseData {
  return {
    title: "",
    priority: 0,
    gradeScale: {
      A: 0,
      B: 0,
      C: 0,
      D: 0
    },
    gradeWeights: {
      homeworkWeight: 0,
      projectWeight: 0,
      examWeight: 0
    }
  }
}

export const Home: React.FC = () => {
  const classes = useStyles()

  const [loaded, setLoaded] = useState([false, false, false])

  const [toolbarSelection, setToolbarSelection] = useState(0)
  const [slideStates, setSlideStates] = useState([true, false])
  const [settingsState, setSettingsState] = useState(false);
  const [progressSettings, setProgressSettings] = useState({
    checkbox1: false
  })

  const [coursesData, setCoursesData] = useState<CourseData[]>([])
  const [homeworks, setHomeworks] = useState<DataStructure[]>([])
  const [projects, setProjects] = useState<DataStructure[]>([])
  const [exams, setExams] = useState<DataStructure[]>([])

  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [taskData, setTaskData] = useState<TaskData[]>([])

  const firebase_User = app.auth().currentUser;
  let currentUserID = "";
  if (firebase_User) {
    currentUserID = firebase_User.uid;
  }

  const userCollection = app
      .firestore()
      .collection('users')
      .doc(currentUserID)

  let courseCollection = userCollection
      .collection('Courses')

  let hwCollection = userCollection
      .collection('HomeworkData')

  let examCollection = userCollection
      .collection('ExamData')

  let projCollection = userCollection
      .collection('ProjectData')

  useEffect(() => {

    const courseList = courseCollection
        .onSnapshot(querySnapshot => {
            const dataList: CourseData[] = [];

            querySnapshot.forEach(course => {
                const courseData = course.data();
                let tempItem = emptyCourseData()

                tempItem = {
                  title: courseData.courseName,
                  priority: courseData.priority,
                  gradeScale: {
                    A: courseData.gradeScale.AMinus,
                    B: courseData.gradeScale.BMinus,
                    C: courseData.gradeScale.CMinus,
                    D: courseData.gradeScale.DMinus
                  },
                  gradeWeights: {
                    homeworkWeight: courseData.gradeWeights.homework,
                    projectWeight: courseData.gradeWeights.project,
                    examWeight: courseData.gradeWeights.exam
                  }
                }
                
                dataList.push(tempItem)
            });

            setCoursesData(dataList)
        });
        let tempLoad = loaded
        loaded[0] = true
        setLoaded(tempLoad)
    return () => courseList();
  }, [])

  useEffect(() => {

    const homeworkList = hwCollection
        .onSnapshot(querySnapshot => {
            const dataList: DataStructure[] = [];

            querySnapshot.forEach(course => {
                const courseData = course.data();
                let tempItem = emptyData()

                if(courseData) {
                  courseData.homeworks.forEach((homework: DataStructure) => {

                    if (homework){
                      tempItem = {
                        title: homework.title,
                        class: courseData.class,
                        DateDue: homework.DateDue,
                        grade: homework.grade,
                        section_weight: homework.section_weight,
                      }

                      dataList.push(tempItem);
                    }
                  })
                }
            });
            setHomeworks(dataList)
            let tempLoad = loaded
            loaded[1] = true
            setLoaded(tempLoad)
        });
    return () => homeworkList();
  }, []);

  useEffect(() => {

    const projectList = projCollection
        .onSnapshot(querySnapshot => {
            const dataList: DataStructure[] = [];

            querySnapshot.forEach(course => {
                const courseData = course.data();
                let tempItem = emptyData()

                if(courseData) {
                  courseData.projects.forEach((project: DataStructure) => {

                    if (project){
                      tempItem = {
                        title: project.title,
                        class: courseData.class,
                        DateDue: project.DateDue,
                        grade: project.grade,
                        section_weight: project.section_weight,
                      }

                      dataList.push(tempItem);
                    }
                  })
                }
            });
            setProjects(dataList)
            let tempLoad = loaded
            loaded[2] = true
            setLoaded(tempLoad)
        });
    return () => projectList();
  }, []);

  useEffect(() => {

    const examList = examCollection
        .onSnapshot(querySnapshot => {
            const dataList: DataStructure[] = [];

            querySnapshot.forEach(course => {
                const courseData = course.data();
                let tempItem = emptyData()

                if(courseData) {
                  courseData.exams.forEach((exam: DataStructure) => {

                    if (exam){
                      tempItem = {
                        title: exam.title,
                        class: courseData.class,
                        DateDue: exam.DateDue,
                        grade: exam.grade,
                        section_weight: exam.section_weight,
                      }

                      dataList.push(tempItem);
                    }
                  })
                }
            });
            setExams(dataList)
        });
    return () => examList();
  }, []);


  const handleToolbarNav = (event: React.ChangeEvent<{}>, newValue: number) => {
    let slidersTemp = slideStates
    slidersTemp[newValue] = !slidersTemp[newValue]
    slidersTemp[toolbarSelection] = !slidersTemp[toolbarSelection]
    
    setSlideStates(slidersTemp)
    setToolbarSelection(newValue);
  };

  const getClassProgress = (course: CourseData) => {

      var homework = 0, project = 0, exam = 0, index = 0
      var maxIndex = Math.max(homeworks.length, projects.length, exams.length)
      var grade

      homeworks.forEach(hw => {
        console.log(hw.class)
        console.log(course.title)
        if (hw.class === course.title){
          homework += homeworks[index].grade * (homeworks[index].section_weight / 100)
        }
      })

      // for (index; index < maxIndex; index++){
      //   if (index < homeworks.length && homeworks[index].class === course.title){
      //     homework += homeworks[index].grade * (homeworks[index].section_weight / 100)
      //   }

      //   if (index < projects.length && projects[index].class === course.title){
      //     project += projects[index].grade * (projects[index].section_weight / 100)
      //   }

      //   if (index < exams.length && exams[index].class === course.title){
      //     exam += exams[index].grade * (exams[index].section_weight / 100)
      //   }
      // }

      grade = {
        total:  (course.gradeWeights.homeworkWeight * homework) + 
                (course.gradeWeights.projectWeight * project) + 
                (course.gradeWeights.examWeight * exam),
        homework: homework,
        project: project,
        exam: exam
      }

      return grade
  }

  const getTaskData = () => {

    let tasks  = Array()

    homeworks.forEach(hw => {
      let courseMatch = emptyCourseData()
      let findTerm

      if((findTerm = coursesData.find(course => course.title === hw.class)) !== undefined)
        courseMatch = findTerm

      const tempHw = {
        course: hw.class,
        title: hw.title,
        dueBy: hw.DateDue,
        priority: courseMatch?.priority,
        sectionWeight: hw.section_weight,
        overallWeight: courseMatch?.gradeWeights.homeworkWeight * hw.section_weight
      }

      tasks.push(tempHw)
    })

    projects.forEach(proj => {
      let courseMatch = emptyCourseData()
      let findTerm

      if((findTerm = coursesData.find(course => course.title === proj.class)) !== undefined)
        courseMatch = findTerm

      const tempProj = {
        course: proj.class,
        title: proj.title,
        dueBy: proj.DateDue,
        priority: courseMatch?.priority,
        sectionWeight: proj.section_weight,
        overallWeight: courseMatch?.gradeWeights.homeworkWeight * proj.section_weight
      }

      tasks.push(tempProj)
    })

    exams.forEach(exam => {
      let courseMatch = emptyCourseData()
      let findTerm

      if((findTerm = coursesData.find(course => course.title === exam.class)) !== undefined)
        courseMatch = findTerm

      const tempExam = {
        course: exam.class,
        title: exam.title,
        dueBy: exam.DateDue,
        priority: courseMatch?.priority,
        sectionWeight: exam.section_weight,
        overallWeight: courseMatch?.gradeWeights.homeworkWeight * exam.section_weight
      }

      tasks.push(tempExam)
    })
    return tasks
  }

  const progressSection = (
    <Grid container direction = "row" spacing = {3}>
      {(loaded[0] && loaded[1] && loaded[2]) &&
      coursesData.map((item) => (
        <Grid key = {"progGrid-" + `${nextId()}`} item xs = {12} sm = {6} md = {6} lg = {4} xl = {4}>
          <CustomCardProgress
          key = {"progItem-" + `${nextId()}`}
          title = {item.title}
          data = {getClassProgress(item)}
          />
        </Grid>
      ))}
    </Grid>
  )
  

  const taskSection = (
    <Grid key = "taskContainer" item xs = {12} className = {classes.tableRoot}>
      <CustomTable
      key = "taskTable"
      data = {taskData}
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
            {(taskData.length !== 0) ? taskSection : <div></div>}
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
