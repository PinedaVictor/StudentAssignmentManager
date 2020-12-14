import React, { useEffect, useState } from "react";
import { app } from "../../Database/initFirebase"
import nextId from "react-id-generator";

import { BORDER_COLOR, BORDER_COLOR_HOVER, SECONDARY_COLOR } from "../../Styles/global";
import { Container, Grid, makeStyles, Slide } from "@material-ui/core";
import { CustomCardProgress } from "../ReusableParts/CustomCardProgress";
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { CustomTable } from "../ReusableParts/CustomTable";

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

  const [coursesData, setCoursesData] = useState<CourseData[]>([])
  const [homeworks, setHomeworks] = useState<DataStructure[]>([])
  const [projects, setProjects] = useState<DataStructure[]>([])
  const [exams, setExams] = useState<DataStructure[]>([])

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
                const courseDataRemote = course.data();
                let tempItem = emptyCourseData()

                tempItem = {
                  title: courseDataRemote.courseName,
                  priority: courseDataRemote.priority,
                  gradeScale: {
                    A: courseDataRemote.gradeScale.AMinus,
                    B: courseDataRemote.gradeScale.BMinus,
                    C: courseDataRemote.gradeScale.CMinus,
                    D: courseDataRemote.gradeScale.DMinus
                  },
                  gradeWeights: {
                    homeworkWeight: courseDataRemote.gradeWeights.homework,
                    projectWeight: courseDataRemote.gradeWeights.project,
                    examWeight: courseDataRemote.gradeWeights.exam
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

      for (index; index < maxIndex; index++){
        if (index < homeworks.length && homeworks[index].class === course.title){
          homework += homeworks[index].grade * (homeworks[index].section_weight / 100)
        }

        if (index < projects.length && projects[index].class === course.title){
          project += projects[index].grade * (projects[index].section_weight / 100)
        }

        if (index < exams.length && exams[index].class === course.title){
          exam += exams[index].grade * (exams[index].section_weight / 100)
        }
      }

      const total = ((course.gradeWeights.homeworkWeight / 100) * homework) + 
                  ((course.gradeWeights.projectWeight / 100) * project) + 
                  ((course.gradeWeights.examWeight / 100) * exam)

      grade = {
        total:  Math.round((total + Number.EPSILON) * 100) / 100,
        homework: Math.round((homework + Number.EPSILON) * 100) / 100,
        project: Math.round((project + Number.EPSILON) * 100) / 100,
        exam: Math.round((exam + Number.EPSILON) * 100) / 100
      }



      return grade
  }

  const getTaskData = () => {

    var index = 0 
    const maxIndex = Math.max(homeworks.length, projects.length, exams.length)
    let tasks  = Array()

    homeworks.forEach((hw) => {

      let matchingClass = coursesData.find((course) => (course.title === hw.class))
      let priority = 0
      let hwWeight = 0
      console.log(matchingClass)

      if(matchingClass !== undefined && matchingClass !== null){
        priority = matchingClass.priority
        hwWeight = matchingClass.gradeWeights.homeworkWeight
      }

      tasks.push({
        class: hw.class,
        title: hw.title,
        dueBy: hw.DateDue,
        priority: priority,
        sectionWeight: hw.section_weight + "%",
        overallWeight: ((hwWeight / 100) * hw.section_weight) + "%"
      })

    })

    projects.forEach((prj) => {

      let matchingClass = coursesData.find((course) => (course.title === prj.class))
      let priority = 0
      let prjWeight = 0

      if(matchingClass !== undefined && matchingClass !== null){
        priority = matchingClass.priority
        prjWeight = matchingClass.gradeWeights.projectWeight
      }

      tasks.push({
        class: prj.class,
        title: prj.title,
        dueBy: prj.DateDue,
        priority: priority,
        sectionWeight: prj.section_weight + "%",
        overallWeight: ((prjWeight / 100) * prj.section_weight) + "%"
      })

    })

    exams.forEach((exam) => {

      let matchingClass = coursesData.find((course) => (course.title === exam.class))
      let priority = 0
      let examWeight = 0

      if(matchingClass !== undefined && matchingClass !== null){
        priority = matchingClass.priority
        examWeight = matchingClass.gradeWeights.examWeight
      }

      tasks.push({
        class: exam.class,
        title: exam.title,
        dueBy: exam.DateDue,
        priority: priority,
        sectionWeight: exam.section_weight + "%",
        overallWeight: ((examWeight / 100) * exam.section_weight) + "%"
      })

    })

    tasks.sort((a, b) => (new Date(a.dueBy) >= new Date(b.dueBy)) ? 1 : -1)

    return tasks
  }

  const progressSection = (
    
      <Grid container direction = "row" spacing = {3} justify = "center" alignItems = "flex-start">
        
        {(loaded[0] && loaded[1] && loaded[2]) &&
        coursesData.map((item) => (
          <Grid key = {"progGrid-" + `${nextId()}`} item xs = {12} sm = {8} md = {5} lg = {4} xl = {3}>
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
    <Grid key = "taskContainer" item xs = {12}>
      {(loaded[0] && loaded[1] && loaded[2]) &&
      <CustomTable
      key = "taskTable"
      data = {getTaskData()}
      headerText = {tableColumns}
      />}
    </Grid>
  )

  return (
    <Container style = {{width: "80%"}}>
      <Grid container direction = "column" justify = "center" alignItems = "center" spacing = {6}>

        <Grid key = "tabBar" item xs = {9}>
          <CustomScrollableTabs
          className={classes.toolbarRoot}
          tabValue={toolbarSelection}
          onChange={handleToolbarNav}
          tabNames={["Course Progress", "Task List"]}
          />
        </Grid>

        
        <Grid container>
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

  tableRoot: {
    display: "flex",
    height: "70vh",
    overflowY: "scroll"
  }
}));
