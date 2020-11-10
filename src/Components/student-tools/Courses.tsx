/*
Look up either React lodash, or React debounce for potential performance improvements with materialui update components.
*/

import React, { useState } from "react";
import { DynamicCard }  from "../ReusableParts/DynamicCard";
import { create } from "ts-style";
import { createStyles, makeStyles, Slider, TextField, Theme } from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";
import { CustomModal } from "../ReusableParts/CustomModal";

import { app } from "../../Database/initFirebase"

const courses = [
  {
    id: "gf67hx",
    name: "Comp 356",
    email: "some.guy@gmail.com",
    officeHours: "Tu/Th 2:00pm - 3:15pm",
    lateWorkPolicy: "No late work allowed",

    gradingScale: {
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

  {
    id: "buq5gb",
    name: "Phil 101",
    email: "dude.broson@gmail.com",
    officeHours: "Mo 7:00pm - 9:45pm",
    lateWorkPolicy: "Turn it in whenever, I don't care.",

    gradingScale: {
      AMinus: 90,
      BMinus: 80,
      CMinus: 70,
      DMinus: 60
    },

    gradeWeights: {
      homework: 25,
      project: 0,
      exam: 50,
      quiz: 25
    }
  },

  {
    id: "ha4n7",
    name: "BS 101",
    email: "blah.mehson@gmail.com",
    officeHours: "Tu/Th 12:00pm - 2:00pm",
    lateWorkPolicy: "No late work allowed",

    gradingScale: {
      AMinus: 95,
      BMinus: 90,
      CMinus: 85,
      DMinus: 80
    },

    gradeWeights: {
      homework: 0,
      project: 0,
      exam: 100,
      quiz: 0
    }
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 1000
      },
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '75ch',
    },

    numberField: {
        width: '15ch',
    },

    textNormal: {
      fontSize: 18
    },

    inputTextSmall: {
      fontSize: 14
    },

    labelTextSmall: {
      fontSize: 12
    }
  }),
);

interface ModalFields {
  courseName: string,
  email: string,
  hours: string,
  latePolicy: string,
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

  const [EditCourse, setEditCourse] = useState<ModalFields>({
    courseName: "",
    email: "",
    hours: "",
    latePolicy: "",
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

    if (modalStage === 0){
      setCardModal(true)
    }

    
    setModalStage(modalStage + direction)

  }

  const submitModal = () => {
          
    setModalStage(0)
    setCardModal(false)
    clearTextInputs()
  }

  const getModalForm = () => {
    if (modalStage === 1)
      return CourseModal_Stage1

    else if (modalStage === 2)
      return CourseModal_Stage2

    else if (modalStage === 3)
      return CourseModal_Stage3

    else return (<form></form>)
  }

  const clearTextInputs = () => {
    setEditCourse({
      courseName: "",
      email: "",
      latePolicy: "",
      hours: "",

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

  const deleteCourse = () => {

  }

  const setModalInput = (field: "courseName" | "email" | "latePolicy"  | "hours" | "A-" | "B-" | "C-" | "D-" | "hwWeight" | "examWeight" | "projWeight" | "quizWeight", value: string) => {
   setEditCourse( {
      courseName: (field === "courseName")  ?  value : EditCourse.courseName,
      email: (field === "email")            ?            value : EditCourse.email,
      latePolicy: (field === "latePolicy")  ?   value : EditCourse.latePolicy,
      hours: (field === "hours")            ?   value : EditCourse.hours,

      gradeScale: (field === "A-" || field === "B-" || field === "C-" || field === "D-")          
        ? {
          AMinus: (field === "A-") ? validateNumInput(value) : EditCourse.gradeScale.AMinus,
          BMinus: (field === "B-") ? validateNumInput(value) : EditCourse.gradeScale.BMinus,
          CMinus: (field === "C-") ? validateNumInput(value) : EditCourse.gradeScale.CMinus,
          DMinus: (field === "D-") ? validateNumInput(value) : EditCourse.gradeScale.DMinus
          } 
        : EditCourse.gradeScale,

      gradeWeights: (field === "hwWeight" || field === "examWeight" || field === "projWeight" || field === "quizWeight")
        ? {
          homework: (field === "hwWeight") ? validateNumInput(value) : EditCourse.gradeWeights.homework,
          project: (field === "projWeight") ? validateNumInput(value) : EditCourse.gradeWeights.project,
          exam: (field === "examWeight") ? validateNumInput(value) : EditCourse.gradeWeights.exam,
          quiz: (field === "quizWeight") ? validateNumInput(value) : EditCourse.gradeWeights.quiz,
          }
        : EditCourse.gradeWeights

    })
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

  const CourseModal_Stage1 = (
    
    <form className={classes.root} noValidate autoComplete="off">

        <div style = {styles.modalHeader}> General Information </div>
        <div>
            <TextField 
            value = {EditCourse.courseName}
            onChange = {(e) => {setModalInput("courseName", e.target.value)}}
            label = {"Class Name"}
            placeholder = "Math 101"
            variant = "filled"
            required={true}
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {EditCourse.email}
            onChange = {(e) => {setModalInput("email", e.target.value)}}
            label = {"Email"}
            placeholder = "Dude.Brochacho@gmail.com"
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal }}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {EditCourse.hours}
            onChange = {(e) => {setModalInput("hours", e.target.value)}}
            label = {"Office Hours"}
            placeholder = "Mo/We 2:00pm - 3:45pm"
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {EditCourse.latePolicy}
            onChange = {(e) => {setModalInput("latePolicy", e.target.value)}}
            label = {"Late Work Policy"}
            placeholder = "No late work allowed!"
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
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
          title = "Close"
          />
        </div>

    </form>
    
  )

const CourseModal_Stage2 = (
  <form  className={classes.root} noValidate autoComplete="off">

    <div style = {styles.modalHeader}> Grading Scale </div>
    
    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >A-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "A-"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeScale.BMinus, EditCourse.gradeScale.CMinus, EditCourse.gradeScale.DMinus)}
        value = {EditCourse.gradeScale.AMinus}
        onChange = {(event, value) => setModalInput("A-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeScale.AMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >B-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "B-"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeScale.AMinus, EditCourse.gradeScale.CMinus, EditCourse.gradeScale.DMinus)}
        value = {EditCourse.gradeScale.BMinus}
        onChange = {(event, value) => setModalInput("B-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeScale.BMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >C-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "C-"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeScale.AMinus, EditCourse.gradeScale.BMinus, EditCourse.gradeScale.DMinus)}
        value = {EditCourse.gradeScale.CMinus}
        onChange = {(event, value) => setModalInput("C-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeScale.CMinus}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >D-</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "D-"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeScale.AMinus, EditCourse.gradeScale.BMinus, EditCourse.gradeScale.CMinus)}
        value = {EditCourse.gradeScale.DMinus}
        onChange = {(event, value) => setModalInput("D-", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeScale.DMinus}%</text>
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
        max = {validateScaleValues(EditCourse.gradeWeights.project, EditCourse.gradeWeights.exam, EditCourse.gradeWeights.quiz)}
        value = {EditCourse.gradeWeights.homework}
        onChange = {(event, value) => setModalInput("hwWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeWeights.homework}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Projects</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "project"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeWeights.homework, EditCourse.gradeWeights.exam, EditCourse.gradeWeights.quiz)}
        value = {EditCourse.gradeWeights.project}
        onChange = {(event, value) => setModalInput("projWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeWeights.project}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Exams</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "exam"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeWeights.homework, EditCourse.gradeWeights.project, EditCourse.gradeWeights.quiz)}
        value = {EditCourse.gradeWeights.exam}
        onChange = {(event, value) => setModalInput("examWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeWeights.exam}%</text>
      </div>
    </div>

    <div style = {styles.weightSection}>
      <div style = {styles.labelStyle} >Quizzes</div>

      <div style = {styles.weightRow}>
        <Slider
        name = "quiz"
        min = {0}
        max = {validateScaleValues(EditCourse.gradeWeights.homework, EditCourse.gradeWeights.project, EditCourse.gradeWeights.exam)}
        value = {EditCourse.gradeWeights.quiz}
        onChange = {(event, value) => setModalInput("quizWeight", value.toString())}
        />

        <text style = {{fontSize: 18}}> {EditCourse.gradeWeights.quiz}%</text>
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

  return (
    <div style = {styles.pageLayout}>

      <div 
      style = {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
      }}>
        <CustomButton
        title = "Add Class"
        onClick = {() => cycleModalStage(1)}
        theme = "default"
        dimensions = {{
          width: "auto",
          height: "auto"
        }}
        />
      </div>

      <div style = {styles.coursesBody}>
        {courses.map((item, i) => (
          <DynamicCard
          header={item.name}
          bodyContents={{
            email: item.email,
            officeHours: item.officeHours,
            lateWorkPolicy: item.lateWorkPolicy,
            gradingScale: item.gradingScale,
            gradeWeights: item.gradeWeights
          }}
          width={"auto"}
          type="standard"
          editClick = {() => cycleModalStage(1)}
          deleteClick = {() => deleteCourse()}
          /> 
        ))}
      </div>

      {(modalStage !== 0) &&
        <CustomModal
          layout = {getModalForm()}
          modalState = {cardModal}
        />}
    </div>
  );
};

const styles = create({
  pageLayout: {
    display: 'grid',
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
},

  coursesBody: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "left",
    alignItems: "left",
    minWidth: 400,
    maxWidth: 1080,
    height: "auto",
    overflowX: "scroll" as "scroll",
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: "bold" as "bold"
  },

  weightSection: {
    display: 'grid',
    gridTemplateRows: "auto auto",
    margin: 15,
    width: "90%"
  },

  weightRow: {
    display: 'grid',
    gridTemplateColumns: "350px auto",
    columnGap: "1rem"
  },

  labelStyle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold" as "bold",
    height: 10
  },

  inputStyle: {
    fontSize: 14,
    width: 45
  }
})