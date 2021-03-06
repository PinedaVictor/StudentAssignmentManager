import React, { useEffect, useState } from "react";
import { CustomCardStandard }  from "../ReusableParts/CustomCardStandard";
import { Container, createMuiTheme, Grid, makeStyles, responsiveFontSizes, ThemeProvider, Typography} from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";
import { CustomPopup } from "../ReusableParts/CustomPopup";
import { CustomTextField } from "../ReusableParts/CustomTextField"
import { DatabaseDocNames } from "../../Database/utils";

import { app } from "../../Database/initFirebase"
import { NumberInput } from "../ReusableParts/NumberInput";
import { MenuSelectionBox } from "../ReusableParts/MenuSelectionBox";
import { CustomSlider} from "../ReusableParts/CustomSlider"
import { BORDER_COLOR } from "../../Styles/global";

interface CourseDataStructure {
  id: string,
  courseName: string,
  email: string,

  officeHours: Array<{
    day: Array<string>,
    start: {
      hour: number,
      minute: number,
      setting: string
      },
    end: {
      hour: number,
      minute: number,
      setting: string
      }
    }>,

  latePolicy: string,
  curvingPolicy: string,
  priority: number,
  gradeScale: {
    AMinus : number,
    BMinus : number,
    CMinus : number,
    DMinus : number
  },

  gradeWeights: {
    homework : number,
    project : number,
    exam : number
  }
}

export const Courses: React.FC = () => {
  const classes = useStyles()
  const [courses, setCourses] = useState<CourseDataStructure[]>([])
  const [prevCourseName, setPrevCourseName] = useState("");

  const firebase_User = app.auth().currentUser;
  let currentUserID = "";
  if (firebase_User) {
    currentUserID = firebase_User.uid;
  }

  useEffect(() => {
    const coursesList = app
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("Courses")
      .onSnapshot(querySnapshot => {

        const remoteData: CourseDataStructure[] = [];
        querySnapshot.forEach(document => {
          const courseData = document.data();
          if (courseData) {
            const tempCourseData = {
              id: document.id,
              courseName: courseData.courseName,
              email: courseData.email,
            
              officeHours: courseData.officeHours,
            
              latePolicy: courseData.latePolicy,
              curvingPolicy: courseData.curvingPolicy,
              priority: courseData.priority,
              gradeScale: courseData.gradeScale,
            
              gradeWeights: courseData.gradeWeights
            };
            remoteData.push(tempCourseData);
          }
        });
        setCourses(remoteData);
      });
    return () => coursesList();
  }, [currentUserID]);

  let fontTheme = createMuiTheme();
  fontTheme = responsiveFontSizes(fontTheme);

  const [cardModal, setCardModal] = useState(false);
  const [modalStage, setModalStage] = useState(0)

  const [CourseInfo, setCourseInfo] = useState<CourseDataStructure>({
    id: "",
    courseName: "",
    email: "",
    officeHours: [{
      day: [""],
      start: {
        hour: 0,
        minute: 0,
        setting: ""
        },
      end: {
        hour: 0,
        minute: 0,
        setting: ""
        }
      }],
    latePolicy: "",
    curvingPolicy: "",
    priority: 0,

    gradeScale: {
      AMinus: 0,
      BMinus: 0,
      CMinus: 0,
      DMinus: 0,
    },

    gradeWeights: {
      homework: 0,
      project: 0,
      exam: 0
    }
  })

  const cycleModalStage = (direction: 1 | -1) => {

    setModalStage(modalStage + direction)

  }

  const openEditModal = (data: 
    {
      id: string,
      courseName: string, 
      email: string, 
      officeHours: Array<{
        day: Array<string>,
        start: {
          hour: number,
          minute: number,
          setting: string
          },
        end: {
          hour: number,
          minute: number,
          setting: string
          }
        }>, 
      latePolicy: string,
      curvingPolicy: string, 
      priority: number,
      gradeScale: {AMinus: number, BMinus: number, CMinus: number, DMinus: number}
      gradeWeights: {homework: number, project: number, exam: number}
    } ) => {
  
    setCourseInfo(data)
    setPrevCourseName(data.courseName);
    cycleModalStage(1)
    setCardModal(true)
  }

  const openAddModal = () => {

    let emptyCourse = {
      id: "",
      courseName: "",
      email: "",

      officeHours: [{
        day: [""],
        start: {
          hour: 0,
          minute: 0,
          setting: ""
          },
        end: {
          hour: 0,
          minute: 0,
          setting: ""
          }
        }],

      latePolicy: "",
      curvingPolicy: "",
      priority: 0,

      gradeScale: {
        AMinus: 0,
        BMinus: 0,
        CMinus: 0,
        DMinus: 0,
      },
  
      gradeWeights: {
        homework: 0,
        project: 0,
        exam: 0
      }
    }

    setCourseInfo(emptyCourse)

    cycleModalStage(1)
    setCardModal(true)
  }
  const addCourseData = async (courseName: string) => {
    let userDoc = app
      .firestore()
      .collection(DatabaseDocNames.users)
      .doc(currentUserID);

      // Add Exam Data for course
      const hwData = { class: courseName, homeworks: []}
      var hwRef = userDoc
        .collection(DatabaseDocNames.hwData)
        .doc();

      await hwRef
        .set(hwData);

      // Add Project Data for course
      const projectData = { class: courseName, projects: [] }

      var projectRef = userDoc
        .collection(DatabaseDocNames.projData)
        .doc();

      await projectRef.set(projectData);
      
      // Add Exam Data for course
      const examData = { class: courseName, exams: [] }
      var examRef = userDoc
        .collection(DatabaseDocNames.examData)
        .doc();

      await examRef
        .set(examData);
  };

  const editCourseDataTitle = async (newCourseName: string, oldCourseName: string) => {
    let userDoc = app
      .firestore()
      .collection(DatabaseDocNames.users)
      .doc(currentUserID);
    
    // Update the HW class
    const hwQuery = userDoc
      .collection(DatabaseDocNames.hwData)
      .where('class', '==', oldCourseName);

    hwQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            class: newCourseName
          });
        });
      });
    
    // Update the project class
    const projQuery = userDoc
      .collection(DatabaseDocNames.projData)
      .where('class', '==', oldCourseName);

    projQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            class: newCourseName
          });
        });
      });
    
    // Update the exam class
    const examQuery = userDoc
      .collection(DatabaseDocNames.examData)
      .where('class', '==', oldCourseName);
    
    examQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            class: newCourseName
          });
        });
      });
  };

  const submitModal = async (action: "add" | "edit") => {
    
      try {
        let collection = await app
          .firestore()
          .collection("users")
          .doc(currentUserID)
          .collection("Courses")

        var doc

        if (action === "add"){
          doc = collection.doc()
          doc.set(CourseInfo);
          
          // Add a new course material for the user
          // (e.g. Exams, HWs, Projects)
          await addCourseData(CourseInfo.courseName);
        }

        else {
          doc = collection.doc(CourseInfo.id)
          doc.update(CourseInfo)
          
          if(CourseInfo.courseName !== prevCourseName)
            await editCourseDataTitle(CourseInfo.courseName, prevCourseName);
        }
        
        setModalStage(0)
        setPrevCourseName('');
        setCardModal(false)
        clearModalInputs()
        
        console.log("Card was Addded successfuly");
      } catch (error) {
        console.log(error);
      }
    
    
  }

  const closeModal = () => {
    setModalStage(0)
    setCardModal(false)
    clearModalInputs()
  }

  const clearModalInputs = () => {
    setCourseInfo({
      id: "",
      courseName: "",
      email: "",

      officeHours: [{
        day: [""],
        start: {
          hour: 0,
          minute: 0,
          setting: ""
          },
        end: {
          hour: 0,
          minute: 0,
          setting: ""
          }
        }],

      latePolicy: "",
      curvingPolicy: "",
      priority: 0,

      gradeScale: {
        AMinus: 0,
        BMinus: 0,
        CMinus: 0,
        DMinus: 0,
      },
  
      gradeWeights: {
        homework: 0,
        project: 0,
        exam: 0
      }
    })
  }

  const deleteCourseData = async (courseName: string) => {
    const userDoc = app
      .firestore()
      .collection(DatabaseDocNames.users)
      .doc(currentUserID);

    // Homework delete  
    const hwQuery = userDoc
      .collection(DatabaseDocNames.hwData)
      .where('class', '==', courseName);

    await hwQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    
    // Project delete
    const projectQuery = userDoc
      .collection(DatabaseDocNames.projData)
      .where('class', '==', courseName);

    await projectQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });

    // Exam delete
    const examQuery = userDoc
      .collection(DatabaseDocNames.examData)
      .where('class', '==', courseName);

    await examQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
  }

  const deleteCourse = async (id: string, courseName: string) => {

    try{
      await app
      .firestore()
      .collection('users')
      .doc(currentUserID)
      .collection('Courses')
      .doc(id)
      .delete()
      
      await deleteCourseData(courseName);

      console.log("Course has been deleted")
    }
    catch {
      console.log("Error deleting course.")
    }
  }

  const setGeneralInfo = (field: "courseName" | "email" | "latePolicy" | "curvingPolicy" | "priority", value: string) => {
   
    let infoCopy = Object.assign({}, CourseInfo)

    if (field !== "priority"){
      infoCopy[field] = value
    }

    else {
      var validation = validateNumInput(value)

      if (validation >= 0 && validation <= 5)
        infoCopy[field] = validation
    }
    
    setCourseInfo(infoCopy)
  }

  const setGradeScale = (field: "AMinus" | "BMinus" | "CMinus" | "DMinus", value: number | number[]) => {

    let infoCopy = Object.assign({}, CourseInfo)
    var finalVal = 0

    if (Array.isArray(value))
      finalVal = value[value.length - 1]

    else finalVal = value
    
    infoCopy["gradeScale"][field] = finalVal

    setCourseInfo(infoCopy)
  }

  const setGradeWeights = (field: "homework" | "project" | "exam", value: number | number[]) => {
    let infoCopy = Object.assign({}, CourseInfo)
    var finalVal = 0

    if (Array.isArray(value))
      finalVal = value[value.length - 1]

    else finalVal = value
    
    infoCopy["gradeWeights"][field] = finalVal

    setCourseInfo(infoCopy)
  }

  const setOfficeHoursDay = (mainIndex: number, subIndex: number, value: string) => {
    let infoCopy = Object.assign({}, CourseInfo)

    if (!infoCopy["officeHours"][mainIndex]["day"].includes(value)){
        infoCopy["officeHours"][mainIndex]["day"][subIndex] = value
    }

    setCourseInfo(infoCopy)
  }

  const validateNumInput = (value: string) => {
    var temp = parseFloat(value)
    
    if(temp === null || temp === undefined || Number.isNaN(temp))
      return 0

    else return temp 
  }

  const validateScaleValues = (field1: number, field2: number) => {
    var difference = 100 - field1 - field2;
    
    if (difference >= 0)
      return difference;

    else return 0;
  }

  const getModalMapping = () => {

    let mapping = [
      ModalStage0,
      ModalStage1,
      ModalStage2,
      ModalStage3,
      ModalStage4
    ]

    return mapping[modalStage]
  }

  const getModalTitle = () => {

    let titles = [
      "",
      "General Information",
      "Office Hours",
      "Grading Scale",
      "Grade Weights"
    ]

    return titles[modalStage]
  }

  const getPlaceholderOfficeDay = (days: string[]) => {
    if (days.length !== 0 && days[days.length - 1] !== "")
      days.push("")

    return days[days.length - 1]
  }

  const concatDayToOfficeHours = (mainIndex: number, value: string) => {
    CourseInfo["officeHours"][mainIndex].day.push(value)
    CourseInfo["officeHours"][mainIndex].day.push("")
  }

  const setOfficeTime = (mainIndex: number, value: number, period: "start" | "end", time: "hour" | "minute") => {
    let infoCopy = Object.assign({}, CourseInfo)

    if((value >= 0 && value <= 12) && time === "hour")
      infoCopy["officeHours"][mainIndex][period][time] = value

    else if ((value >= 0 && value < 60) && time === "minute")
      infoCopy["officeHours"][mainIndex][period][time] = value
    
    else if (value === undefined || isNaN(value) || value === null)
      infoCopy["officeHours"][mainIndex][period][time] = NaN

    else if (infoCopy["officeHours"][mainIndex][period][time] = 0)
      infoCopy["officeHours"][mainIndex][period][time] = value

    setCourseInfo(infoCopy)
  }

  const setOfficeTimeMode = (mainIndex: number, value: string, period: "start" | "end") => {
    let infoCopy = Object.assign({}, CourseInfo)
    infoCopy["officeHours"][mainIndex][period].setting = value

    setCourseInfo(infoCopy)
  }

  const getOfficeOutput = (officeHours: Array<{
    day: Array<string>,
    start: {
      hour: number,
      minute: number,
      setting: string
      },
    end: {
      hour: number,
      minute: number,
      setting: string
      }
    }>) => {
    
    var result = ""

    officeHours.map((mainDay, mainIndex) => {
      mainDay.day.map((subDay, subIndex) => {
        result = result.concat(subDay.substring(0, 2))

        if (subIndex < mainDay.day.length - 1)
          result = result.concat("/")

        
      })

      result = result.concat(" " + mainDay.start.hour.toString() + ":" + mainDay.start.minute.toString() + mainDay.start.setting + " - " + 
                                   mainDay.end.hour.toString() + ":" + mainDay.end.minute.toString() + mainDay.end.setting + ".")

      if (mainIndex < officeHours.length)
        result = result.concat("  ")
    })

    return result
  }

  const ModalStage0 = (<form></form>)

  const ModalStage1 = (

    <form className = {classes.modalWindow}>
      <Grid container direction = "column" spacing = {2}>
        
        <Grid item>
          <NumberInput
          label="Priority"
          value = {CourseInfo.priority}
          onChange = {(event) => setGeneralInfo("priority", event.target.value)}
          />
        </Grid>

        <Grid item>
          <CustomTextField
          label = "Class Name"
          onChange = {(event) => setGeneralInfo("courseName", event.target.value)}
          value = {CourseInfo.courseName}
          placeholder = {(CourseInfo.courseName !== "") ? CourseInfo.courseName : "Math 101"}
          required
          />
        </Grid>

        <Grid item>
          <CustomTextField
          label = "Email"
          onChange = {(event) => setGeneralInfo("email", event.target.value)}
          value = {CourseInfo.email}
          placeholder = {(CourseInfo.email !== "") ? CourseInfo.email : "example.email@gmail.com"}
          />
        </Grid>

        <Grid item>
          <CustomTextField
          label = "Late Work Policy"
          onChange = {(event) => setGeneralInfo("latePolicy", event.target.value)}
          value = {CourseInfo.latePolicy}
          placeholder = {(CourseInfo.latePolicy !== "") ? CourseInfo.latePolicy : "No late work allowed."}
          multiline = {true}
          />
        </Grid>

        <Grid item>
          <CustomTextField
          label = "Curving Policy"
          onChange = {(event) => setGeneralInfo("curvingPolicy", event.target.value)}
          value = {CourseInfo.curvingPolicy}
          placeholder = {(CourseInfo.curvingPolicy !== "") ? CourseInfo.curvingPolicy : "Grade is not curved in any way."}
          multiline = {true}
          />
        </Grid>
        
      </Grid>

      <Grid container direction = "row" spacing = {0} alignContent = "center" justify = "center">
        
        <Grid item style = {{margin: 24}}>
          <CustomButton
          title = "Next"
          size = "small"
          theme = "edit"
          onClick = {() => cycleModalStage(1)}
          />
        </Grid>
        
        <Grid item style = {{margin: 24}}>
          <CustomButton
          title = "Exit"
          size = "small"
          theme = "delete"
          onClick = {() => closeModal()}
          />
        </Grid>
        
      </Grid>
    </form>
  )

  const ModalStage2 = (
    <form className = {classes.modalWindow}>
      <Grid container direction = "column" spacing = {4}>
        
          {
          CourseInfo.officeHours.map((mainDay, mainIndex) => (
            <Grid key = {CourseInfo.id + `mainDay-${mainIndex}`} container item xl = {12} direction = "row" className = {classes.modalOfficeDays}>
              <Grid container direction = "row" justify = "flex-start" alignItems = "center">

                {
                mainDay.day.map((subDay, subIndex) => (
                  <Grid key = {CourseInfo.id + `subday-${subIndex}`} item xl = {1} style = {{marginBottom: 24, marginRight: 24}}>
                    <MenuSelectionBox
                    label = "Day"
                    onChange = {(e) => setOfficeHoursDay(mainIndex, subIndex, e.target.value)}
                    options = {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
                    value = {subDay}
                    />
                  </Grid>
                  
                ))
                }
                {(mainDay.day.length > 0 && mainDay.day.length < 6 && mainDay.day[mainDay.day.length - 1] !== "") &&
                <Grid item xl = {1} style = {{marginBottom: 24}}>
                    <MenuSelectionBox
                    label = "Day"
                    onChange = {(e) => concatDayToOfficeHours(mainIndex, e.target.value)}
                    options = {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
                    value = {getPlaceholderOfficeDay(mainDay.day)}
                    />
                </Grid>
                }
              </Grid>
              <Grid container direction = "row" justify = "flex-start" alignItems = "center">
                
                <Grid item xs = {12} style = {{marginBottom: 12}}>
                  <ThemeProvider theme = {fontTheme}>
                    <Typography variant = "h4">Start Time</Typography>
                  </ThemeProvider>
                </Grid>
                
                <Grid item style = {{marginRight: 12}}>
                  <NumberInput
                  label = "Hour"
                  onChange = {(e) => setOfficeTime(mainIndex, parseInt(e.target.value), "start", "hour")}
                  value = {mainDay.start.hour}
                  />
                </Grid>

                <Grid item style = {{marginRight: 12}}>
                  <NumberInput
                  label = "Minute"
                  onChange = {(e) => setOfficeTime(mainIndex, parseInt(e.target.value), "start", "minute")}
                  value = {mainDay.start.minute}
                  />
                </Grid>

                <Grid item >
                  <MenuSelectionBox
                  label = ""
                  value = {mainDay.start.setting}
                  onChange = {(e) => setOfficeTimeMode(mainIndex, e.target.value, "start")}
                  options = {["am", "pm"]}
                  width = "7ch"
                  />
                </Grid>

              </Grid>

              <Grid container direction = "row" justify = "flex-start" alignItems = "center">
                
                <Grid item xs = {12} style = {{marginBottom: 12}}>
                  <ThemeProvider theme = {fontTheme}>
                    <Typography variant = "h4">End Time</Typography>
                  </ThemeProvider>
                </Grid>
                
                <Grid item style = {{marginRight: 12}}>
                  <NumberInput
                  label = "Hour"
                  onChange = {(e) => setOfficeTime(mainIndex, parseInt(e.target.value), "end", "hour")}
                  value = {mainDay.end.hour}
                  />
                </Grid>

                <Grid item style = {{marginRight: 12}}>
                  <NumberInput
                  label = "Minute"
                  onChange = {(e) => setOfficeTime(mainIndex, parseInt(e.target.value), "end", "minute")}
                  value = {mainDay.end.minute}
                  />
                </Grid>

                <Grid item >
                  <MenuSelectionBox
                  label = ""
                  value = {mainDay.end.setting}
                  onChange = {(e) => setOfficeTimeMode(mainIndex, e.target.value, "end")}
                  options = {["am", "pm"]}
                  width = "7ch"
                  />
                </Grid>

              </Grid>

            </Grid>
          ))
          }
      </Grid>

      <Grid container direction = "row" spacing = {0} alignContent = "center" justify = "center">
        
        <Grid item style = {{margin: 24}}>
          <CustomButton
          title = "Next"
          size = "small"
          theme = "edit"
          onClick = {() => cycleModalStage(1)}
          />
        </Grid>
        
        <Grid item style = {{margin: 24}}>
          <CustomButton
          title = "Back"
          size = "small"
          theme = "delete"
          onClick = {() => cycleModalStage(-1)}
          />
        </Grid>
        
      </Grid>
    </form>
  )
  
  const ModalStage3 = (
    <form className = {classes.modalWindow}>
      <Grid container direction = "column">

        <Grid container direction = "row" justify = "flex-start" alignItems = "center">
          <Grid item xs = {3} sm = {2} md = {1} lg = {1} xl = {1}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"A-:  " + CourseInfo.gradeScale.AMinus + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {9} sm = {10} md = {11} lg = {11} xl = {11}>
            <CustomSlider
            min = {CourseInfo.gradeScale.BMinus}
            max = {100}
            value = {CourseInfo.gradeScale.AMinus}
            onChange = {(event, value) => setGradeScale("AMinus", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "row" justify = "flex-start" alignItems = "center">
          <Grid item xs = {3} sm = {2} md = {1} lg = {1} xl = {1}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"B-:  " + CourseInfo.gradeScale.BMinus + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {9} sm = {10} md = {11} lg = {11} xl = {11}>
            <CustomSlider
            min = {CourseInfo.gradeScale.CMinus}
            max = {CourseInfo.gradeScale.AMinus}
            value = {CourseInfo.gradeScale.BMinus}
            onChange = {(event, value) => setGradeScale("BMinus", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "row" justify = "flex-start" alignItems = "center">
          <Grid item xs = {3} sm = {2} md = {1} lg = {1} xl = {1}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"C-:  " + CourseInfo.gradeScale.CMinus + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {9} sm = {10} md = {11} lg = {11} xl = {11}>
            <CustomSlider
            min = {CourseInfo.gradeScale.DMinus}
            max = {CourseInfo.gradeScale.BMinus}
            value = {CourseInfo.gradeScale.CMinus}
            onChange = {(event, value) => setGradeScale("CMinus", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "row" justify = "flex-start" alignItems = "center">
          <Grid item xs = {3} sm = {2} md = {1} lg = {1} xl = {1}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"D-:  " + CourseInfo.gradeScale.DMinus + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {9} sm = {10} md = {11} lg = {11} xl = {11}>
            <CustomSlider
            min = {0}
            max = {CourseInfo.gradeScale.CMinus}
            value = {CourseInfo.gradeScale.DMinus}
            onChange = {(event, value) => setGradeScale("DMinus", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "row" spacing = {0} alignContent = "center" justify = "center">
          
          <Grid item style = {{margin: 24}}>
            <CustomButton
            title = "Next"
            size = "small"
            theme = "edit"
            onClick = {() => cycleModalStage(1)}
            />
          </Grid>
          
          <Grid item style = {{margin: 24}}>
            <CustomButton
            title = "Back"
            size = "small"
            theme = "delete"
            onClick = {() => cycleModalStage(-1)}
            />
          </Grid>
          
        </Grid>
      </Grid>
    </form>
  )

  const ModalStage4 = (
    <form className = {classes.modalWindow}>
      <Grid container direction = "column">

        <Grid container direction = "column">
          <Grid item xs = {12}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"Homework:  " + CourseInfo.gradeWeights.homework + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {12}>
            <CustomSlider
            min = {0}
            max = {validateScaleValues(CourseInfo.gradeWeights.project, CourseInfo.gradeWeights.exam)}
            value = {CourseInfo.gradeWeights.homework}
            onChange = {(event, value) => setGradeWeights("homework", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "column">
          <Grid item xs = {12}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"Projects:  " + CourseInfo.gradeWeights.project + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {12}>
            <CustomSlider
            min = {0}
            max = {validateScaleValues(CourseInfo.gradeWeights.homework, CourseInfo.gradeWeights.exam)}
            value = {CourseInfo.gradeWeights.project}
            onChange = {(event, value) => setGradeWeights("project", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "column">
          <Grid item xs = {12}>
            <ThemeProvider theme = {fontTheme}>
              <Typography variant = "h4"> {"Exams:  " + CourseInfo.gradeWeights.exam + "%"} </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs = {12}>
            <CustomSlider
            min = {0}
            max = {validateScaleValues(CourseInfo.gradeWeights.homework, CourseInfo.gradeWeights.project)}
            value = {CourseInfo.gradeWeights.exam}
            onChange = {(event, value) => setGradeWeights("exam", value)}
            />
          </Grid>
        </Grid>

        <Grid container direction = "row" spacing = {0} alignContent = "center" justify = "center">
            
            <Grid item style = {{margin: 24}}>
              <CustomButton
              title = "Submit"
              size = "small"
              theme = "edit"
              onClick = {() => submitModal((CourseInfo.id !== "") ? "edit" : "add")}
              />
            </Grid>
            
            <Grid item style = {{margin: 24}}>
              <CustomButton
              title = "Back"
              size = "small"
              theme = "delete"
              onClick = {() => cycleModalStage(-1)}
              />
            </Grid>
            
          </Grid>
      </Grid>
    </form>
  )

  return (

    <Container style = {{width: "80%"}}>
      <Grid
      container
      spacing = {8}
      justify = "center"
      alignItems = "center"
      >

        <Grid 
        item 
        xs = {12}
        style = {{textAlign: 'center'}}
        >
          <CustomButton
          title = "Add Course"
          onClick = {() => openAddModal()}
          size = "large"
          />
        </Grid>

        <Grid
        container
        spacing = {3}
        justify = "center"
        alignItems = "flex-start"
        direction = "row"
        >
          {
          courses.map((course) => (
            <Grid
            item
            xs={12}
            sm={9}
            md={5}
            lg={4}
            xl={4}
            key={course.id}
            >
              <CustomCardStandard
              title = {course.courseName}
              data = {{
                priority: course.priority,
                
                gradingScale: {
                  AMinus: course.gradeScale.AMinus + "%",
                  BMinus: course.gradeScale.BMinus + "%",
                  CMinus: course.gradeScale.CMinus + "%",
                  DMinus: course.gradeScale.DMinus + "%",
                },

                gradingWeights: {
                  homework: course.gradeWeights.homework + "%",
                  projects: course.gradeWeights.project + "%",
                  exams: course.gradeWeights.exam + "%"
                },
              }}

              expandingData = {{
                officeHours: getOfficeOutput(course.officeHours),
                email: course.email,
                lateWorkPolicy: course.latePolicy,
                curvingPolicy: course.curvingPolicy,
              }}

              editClick = {() => openEditModal(course)}
              deleteClick = {() => deleteCourse(course.id, course.courseName)}
              />
            </Grid>
          ))
          }
        </Grid>
        
      </Grid>
          
      <CustomPopup
      title = {getModalTitle()}
      layout = {getModalMapping()}
      modalState = {cardModal}
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

  modalOfficeDays: {
    border: "dashed 2px black",
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    marginBottom: 24
  },

  modalOfficeTimes: {
    border: "dashed 1px",
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    padding: 5
  }
}))

