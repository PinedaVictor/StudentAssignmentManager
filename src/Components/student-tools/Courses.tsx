/*
Look up either React lodash, or React debounce for potential performance improvements with materialui update components.
*/

import React, { useState } from "react";
import { CustomCardStandard }  from "../ReusableParts/CustomCardStandard";
import { Container, Grid, makeStyles, Slider, TextField, Typography} from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";
import { CustomPopup } from "../ReusableParts/CustomPopup";
import { CustomTextField } from "../ReusableParts/CustomTextField"

import { app } from "../../Database/initFirebase"
import { NumberInput } from "../ReusableParts/NumberInput";
import { MenuSelectionBox } from "../ReusableParts/MenuSelectionBox";
import { Course } from "../../Pages";
import { SECONDARY_COLOR } from "../../Styles/global";

const courses = [
  {
    id: "gf67hx",
    courseName: "Comp 356",
    email: "some.guy@gmail.com",

    officeHours: [
      {
      day: [ "Monday" , "Wednesday" ],
      start: {
        hour: 10,
        minute: 30,
        setting: "am"
        },

      end: {
        hour: 12,
        minute: 0,
        setting: "pm"
        }
      },
      {
        day: [ "Tuesday" ],
        start: {
          hour: 8,
          minute: 30,
          setting: "am"
          },
  
        end: {
          hour: 9,
          minute: 45,
          setting: "am"
          }
        }
    ],

    latePolicy: "No late work allowed",
    curvingPolicy: "Drop the lowest test score and lowest quiz score.  The grading scale is curved based off the highest grade in the class.",
    priority: 5,

    gradeScale: {
      AMinus: 85,
      BMinus: 70,
      CMinus: 55,
      DMinus: 40
    },

    gradeWeights: {
      homework: 20,
      project: 30,
      exam: 40,
      quiz: 10
    }
  },

  
]

interface ModalFields {
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
    exam : number,
    quiz : number
  }
}

export const Courses: React.FC = () => {
  const classes = useStyles()

  const [cardModal, setCardModal] = useState(false);
  const [modalStage, setModalStage] = useState(0)

  const [CourseInfo, setCourseInfo] = useState<ModalFields>({
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
      exam: 0,
      quiz: 0
    }
  })

  const cycleModalStage = (direction: 1 | -1) => {

    setModalStage(modalStage + direction)

  }

  const openEditModal = (data: 
    {
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
      gradeWeights: {homework: number, project: number, exam: number, quiz: number}
    } ) => {

    setCourseInfo(data)

    cycleModalStage(1)
    setCardModal(true)
  }

  const submitModal = () => {
          
    setModalStage(0)
    setCardModal(false)
    clearModalInputs()
  }

  const closeModal = () => {
    setModalStage(0)
    setCardModal(false)
    clearModalInputs()
  }

  const clearModalInputs = () => {
    setCourseInfo({
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
        exam: 0,
        quiz: 0
      }
    })
  }

  const deleteCourse = (id: string) => {

  }

  const setGeneralInfo = (field: "courseName" | "email" | "latePolicy" | "curvingPolicy" | "priority", value: string) => {
   
    let infoCopy = Object.assign(CourseInfo)
    infoCopy[field] = value

    setCourseInfo(infoCopy)
   
  }

  const setGradeScale = (field: "AMinus" | "BMinus" | "CMinus" | "DMinus", value: number) => {

    let infoCopy = Object.assign({}, CourseInfo)
    infoCopy["gradeScale"][field] = value

    setCourseInfo(infoCopy)
  }

  const setGradeWeights = (field: "homework" | "project" | "exam" | "quiz", value: number) => {
    let infoCopy = Object.assign({}, CourseInfo)
    infoCopy["gradeWeights"][field] = value

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

  const validateScaleValues = (field1: number, field2: number, field3: number) => {
    var difference = 100 - field1 - field2 - field3;
    
    if (difference >= 0)
      return difference;

    else return 0;
  }

  const getModalMapping = () => {

    let mapping = [
      ModalStage0,
      ModalStage1,
      ModalStage2
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

    if(value >= 0 && value <= 12)
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
            <Grid container item xl = {12} direction = "row" className = {classes.modalOfficeDays}>
              <Grid container direction = "row" justify = "flex-start" alignItems = "center">

                {
                mainDay.day.map((subDay, subIndex) => (
                  <Grid item xl = {1} style = {{marginBottom: 24, marginRight: 24}}>
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
                  <Typography variant = "h4">
                    Start Time
                  </Typography>
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
          onClick = {() => cycleModalStage(1)}
          size = "large"
          />
        </Grid>

        <Grid
        container
        spacing = {3}
        justify = "center"
        alignItems = "stretch"
        direction = "row"
        >
          {
          courses.map((course, index) => (
            <Grid
            item
            alignContent = "space-between"
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
                email: course.email,
                officeHours: course.officeHours,
                lateWorkPolicy: course.latePolicy,
                curvingPolicy: course.curvingPolicy,
                
                gradingScale: {
                  AMinus: course.gradeScale.AMinus + "%",
                  BMinus: course.gradeScale.BMinus + "%",
                  CMinus: course.gradeScale.CMinus + "%",
                  DMinus: course.gradeScale.DMinus + "%",
                },

                gradingWeights: {
                  homework: course.gradeWeights.homework + "%",
                  projects: course.gradeWeights.project + "%",
                  exams: course.gradeWeights.exam + "%",
                  quizzes: course.gradeWeights.quiz + "%",
                },
              }}
              editClick = {() => openEditModal(course)}
              deleteClick = {() => deleteCourse(course.id)}
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
    width: "auto"
    
  },

  modalOfficeDays: {
    border: "dashed 2px black",
    borderRadius: 5,
    marginBottom: 24
  },

  modalOfficeTimes: {
    border: "dashed 1px black",
    borderRadius: 5,
    padding: 5
  }
}))



/*
  const CourseModal_Stage2 = (
    <form  className={classes.root} noValidate autoComplete="off">

    <div style = {styles.modalHeader}> Grading Scale </div>
    
    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >A-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "A-"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeScale.BMinus, CourseInfo.gradeScale.CMinus, CourseInfo.gradeScale.DMinus)}
        value = {CourseInfo.gradeScale.AMinus}
        onChange = {(event, value) => setGeneralInfo("A-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeScale.AMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >B-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "B-"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeScale.AMinus, CourseInfo.gradeScale.CMinus, CourseInfo.gradeScale.DMinus)}
        value = {CourseInfo.gradeScale.BMinus}
        onChange = {(event, value) => setGeneralInfo("B-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeScale.BMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >C-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "C-"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeScale.AMinus, CourseInfo.gradeScale.BMinus, CourseInfo.gradeScale.DMinus)}
        value = {CourseInfo.gradeScale.CMinus}
        onChange = {(event, value) => setGeneralInfo("C-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeScale.CMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >D-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "D-"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeScale.AMinus, CourseInfo.gradeScale.BMinus, CourseInfo.gradeScale.CMinus)}
        value = {CourseInfo.gradeScale.DMinus}
        onChange = {(event, value) => setGeneralInfo("D-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeScale.DMinus}%</text>
      </div>
    </div>

    <div style = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          height: 40,
          paddingTop: 25
        }}>

        <CustomButton
        dimensions = {{ width: 70 , height: 40 , margin: 20 }}
        onClick = {() => cycleModalStage(1)}
        theme = "edit"
        title = "Next"
        />

        <CustomButton
        dimensions = {{ width: 70 , height: 40 , margin: 20 }}
        onClick = {() => cycleModalStage(-1)}
        theme = "delete"
        title = "Back"
        />
      </div>
  </form>
  )

  const CourseModal_Stage3 = (
    <form  className={classes.root} noValidate autoComplete="off">

    <div style = {styles.modalHeader}> Grade Weights </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Homework</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "homework"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeWeights.project, CourseInfo.gradeWeights.exam, CourseInfo.gradeWeights.quiz)}
        value = {CourseInfo.gradeWeights.homework}
        onChange = {(event, value) => setGeneralInfo("hwWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeWeights.homework}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Projects</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "project"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeWeights.homework, CourseInfo.gradeWeights.exam, CourseInfo.gradeWeights.quiz)}
        value = {CourseInfo.gradeWeights.project}
        onChange = {(event, value) => setGeneralInfo("projWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeWeights.project}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Exams</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "exam"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeWeights.homework, CourseInfo.gradeWeights.project, CourseInfo.gradeWeights.quiz)}
        value = {CourseInfo.gradeWeights.exam}
        onChange = {(event, value) => setGeneralInfo("examWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeWeights.exam}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Quizzes</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "quiz"
        min = {0}
        max = {validateScaleValues(CourseInfo.gradeWeights.homework, CourseInfo.gradeWeights.project, CourseInfo.gradeWeights.exam)}
        value = {CourseInfo.gradeWeights.quiz}
        onChange = {(event, value) => setGeneralInfo("quizWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {CourseInfo.gradeWeights.quiz}%</text>
      </div>
    </div>

    <div style = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
          height: 40,
          paddingTop: 25
        }}>

        <CustomButton
        dimensions = {{ width: 70 , height: 40 , margin: 20 }}
        onClick = {() => submitModal()}
        theme = "edit"
        title = "Submit"
        />

        <CustomButton
        dimensions = {{ width: 70 , height: 40 , margin: 20 }}
        onClick = {() => cycleModalStage(-1)}
        theme = "delete"
        title = "Back"
        />
      </div>
  </form>
  )
*/