import React, { useState } from "react";
import {DynamicCard}  from "../ReusableParts/DynamicCard";
import { create } from "ts-style";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { CustomButton } from "../ReusableParts/CustomButton";
import { CustomModal } from "../ReusableParts/CustomModal";

const cardTitles = ["Phil 101", "Comp 356", "Meh zzz", "Rand 555", "bleh 100", "phys 220a", "abc 123", "def 456"]

const sectionTitles = ["Email", "Office Hours", "Late Work Policy", "Grading Scale", "Homework Weight", "Project Weight", "Exam Weight", "Quiz Weight"]

const cardBodyData = [
  [
    "dude.dudeson@gmail.com", 
    "T/Th 3:00pm - 4:30pm dfghdfhdhhrthdrhdr dfghdfbsghd dgbdfesg", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "guy.fieri@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ],
  [
    "someguy@gmail.com", 
    "T/Th 3:00pm - 4:30pm", 
    "-20% off each day", 
    "A- = 85%, B- = 70%, C- = 60%, D- = 50%", 
    "20% (10 total)", 
    "30% (3 total)", 
    "40% (2 total)", 
    "10% (5 total)"
  ]
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
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

export const Courses: React.FC = () => {
  const classes = useStyles()

  const [cardModal, setCardModal] = useState(false);

  const [courseText, setCourseText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [hoursText, setHoursText] = useState("");
  const [latePolicyText, setLatePolicyText] = useState("");
  const [gradeScaleText, setGradeScaleText] = useState("");
  const [hwWeightText, setHwWeightText] = useState("");
  const [projWeightText, setProjWeightText] = useState("");
  const [examWeightText, setExamWeightText] = useState("");
  const [quizWeightText, setQuizWeightText] = useState("");

  const clearTextInputs = () => {
    setCourseText("")
    setEmailText("")
    setHoursText("")
    setLatePolicyText("")
    setGradeScaleText("")
    setHwWeightText("")
    setProjWeightText("")
    setExamWeightText("")
    setQuizWeightText("")
  }

  const postCourse = (action: "add" | "edit") => {

    if (action === "add"){
      
    }

    else {
      
    }

    clearTextInputs()
    setCardModal(false)
  }

  const deleteCourse = () => {

  }

  const closeModal = () => {

    clearTextInputs()
    setCardModal(false)
  }

  const getCourseModalBody = (course?: Array<string>, index?: number) => (
    
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField 
            value = {courseText}
            onChange = {(e) => { setCourseText(e.target.value) }}
            label = {"Class Name"}
            placeholder = {(index !== undefined && course !== undefined) ? cardTitles[index] : "Math 101"}
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
            value = {emailText}
            onChange = {(e) => { setEmailText(e.target.value) }}
            label = {"Email"}
            placeholder = {(course !== undefined) ? course[0] : "random.email@aol.com"}
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal }}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {hoursText}
            onChange = {(e) => { setHoursText(e.target.value) }}
            label = {"Office Hours"}
            placeholder = {(course !== undefined) ? course[1] : "Mo/We 2:00pm - 3:45pm"}
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {latePolicyText}
            onChange = {(e) => { setLatePolicyText(e.target.value) }}
            label = {"Late Work Policy"}
            placeholder = {(course !== undefined) ? course[2] : "No late work allowed!"}
            variant = "filled"
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {gradeScaleText}
            onChange = {(e) => { setGradeScaleText(e.target.value) }}
            label = {"Grading Scale"}
            placeholder = {(course !== undefined) ? course[3] : "A- = 85%, B- = ..."}
            variant = "filled"
            required = {true}
            InputProps = {{ className: classes.textNormal}}
            InputLabelProps = {{ className: classes.textNormal}}
            className = {classes.textField}
            size = "small"
            />
        </div>

        <div>
            <TextField 
            value = {hwWeightText}
            onChange = {(e) => { setHwWeightText(e.target.value) }}
            label = {"HW Weight"}
            placeholder = {(course !== undefined) ? course[4] : "20%"}
            variant = "filled"
            InputProps = {{ className: classes.inputTextSmall}}
            InputLabelProps = {{ className: classes.labelTextSmall}}
            className = {classes.numberField}
            size = "small"
            />

            <TextField 
            value = {projWeightText}
            onChange = {(e) => { setProjWeightText(e.target.value) }}
            label = {"Project Weight"}
            placeholder = {(course !== undefined) ? course[5] : "35%"}
            variant = "filled"
            InputProps = {{ className: classes.inputTextSmall}}
            InputLabelProps = {{ className: classes.labelTextSmall}}
            className = {classes.numberField}
            size = "small"
            />

            <TextField 
            value = {examWeightText}
            onChange = {(e) => { setExamWeightText(e.target.value) }}
            label = {"Exam Weight"}
            placeholder = {(course !== undefined) ? course[6] : "50%"}
            variant = "filled"
            InputProps = {{ className: classes.inputTextSmall}}
            InputLabelProps = {{ className: classes.labelTextSmall}}
            className = {classes.numberField}
            size = "small"
            />

            <TextField 
            value = {quizWeightText}
            onChange = {(e) => { setQuizWeightText(e.target.value) }}
            label = {"Quiz Weight"}
            placeholder = {(course !== undefined) ? course[7] : "20%"}
            variant = "filled"
            InputProps = {{ className: classes.inputTextSmall}}
            InputLabelProps = {{ className: classes.labelTextSmall}}
            className = {classes.numberField}
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
          onClick = {() => postCourse("edit")}
          theme = "edit"
          title = "Save"
          />

          <CustomButton
          dimensions = {{ width: 70 , height: 40 , margin: 20 }}
          onClick = {() => closeModal()}
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
        onClick = {() => setCardModal(true)}
        theme = "default"
        dimensions = {{
          width: "auto",
          height: "auto"
        }}
        />
      </div>

      <div style = {styles.coursesBody}>
        {cardBodyData.map((item, i) => (
          <DynamicCard
          header={cardTitles[i]}
          bodyTitles={sectionTitles}
          bodyContents={item}
          width={"auto"}
          type="standard"
          editClick = {() => setCardModal(true)}
          deleteClick = {() => deleteCourse()}
          /> 
        ))}
      </div>

      <CustomModal
      layout = {getCourseModalBody()}
      modalState = {cardModal}
      />
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
  }
})