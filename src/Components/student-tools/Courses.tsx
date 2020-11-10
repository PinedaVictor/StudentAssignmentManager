/*
Look up either React lodash, or React debounce for potential performance improvements with materialui update components.
*/

import React from "react";
import { create } from "ts-style";
// import { createStyles, makeStyles, Theme } from "@material-ui/core";

// const courses = [
//   {
//     id: "gf67hx",
//     name: "Comp 356",
//     email: "some.guy@gmail.com",
//     officeHours: "Tu/Th 2:00pm - 3:15pm",
//     lateWorkPolicy: "No late work allowed",

//     gradingScale: {
//       AMinus: 85,
//       BMinus: 70,
//       CMinus: 55,
//       DMinus: 40,
//     },

//     gradeWeights: {
//       homework: 20,
//       project: 30,
//       exam: 40,
//       quiz: 10,
//     },
//   },
// ];

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       "& .MuiTextField-root": {
//         margin: theme.spacing(1),
//         width: 1000,
//       },
//     },

//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: "75ch",
//     },

//     numberField: {
//       width: "15ch",
//     },

//     textNormal: {
//       fontSize: 18,
//     },

//     inputTextSmall: {
//       fontSize: 14,
//     },

//     labelTextSmall: {
//       fontSize: 12,
//     },
//   })
// );

interface ModalFields {
  courseName: string;
  email: string;
  hours: string;
  latePolicy: string;
  gradeScale: string;
  hwWeight: number;
  projWeight: number;
  examWeight: number;
  quizWeight: number;
}

export const Courses: React.FC = () => {
  //   const classes = useStyles()

  //   const [cardModal, setCardModal] = useState(false);
  //   const [modalStage, setModalStage] = useState("closed")

  //   const [EditCourse, setEditCourse] = useState<ModalFields>({
  //     courseName: "",
  //     email: "",
  //     hours: "",
  //     latePolicy: "",
  //     gradeScale: "",
  //     hwWeight: 0,
  //     projWeight: 0,
  //     examWeight: 0,
  //     quizWeight: 0
  //   })

  //   const cycleModalStage = () => {
  //     if (modalStage === "closed"){
  //       setCardModal(true)
  //       setModalStage("general")
  //     }

  //     else if (modalStage === "general")
  //       setModalStage("grading scale")

  //     else if (modalStage === "grading scale")
  //       setModalStage("grade weights")

  //     else {
  //       setCardModal(false)
  //       setModalStage("closed")
  //     }

  //   }

  //   const clearTextInputs = () => {
  //     setEditCourse({
  //       courseName: "",
  //       email: "",
  //       latePolicy: "",
  //       gradeScale: "",
  //       hours: "",
  //       hwWeight: 0,
  //       projWeight: 0,
  //       examWeight: 0,
  //       quizWeight: 0,
  //     })
  //   }

  //   const submitModal = () => {

  //     setModalStage("closed")
  //     setCardModal(false)
  //     clearTextInputs()
  //   }

  //   const deleteCourse = () => {

  //   }

  //   const closeModal = () => {

  //     clearTextInputs()
  //     setCardModal(false)
  //   }

  //   const setModalInput = (field: "courseName" | "email" | "latePolicy" | "gradeScale" | "hwWeight" | "examWeight" | "projWeight" | "hours" | "quizWeight", value: string) => {
  //    setEditCourse( {
  //       courseName: (field === "courseName")  ?  value : EditCourse.courseName,
  //       email: (field === "email")            ?            value : EditCourse.email,
  //       latePolicy: (field === "latePolicy")  ?   value : EditCourse.latePolicy,
  //       gradeScale: (field === "gradeScale")  ?   value : EditCourse.gradeScale,
  //       hours: (field === "hours")            ?   value : EditCourse.hours,
  //       hwWeight: (field === "hwWeight")      ?   validateWeight(value) : EditCourse.hwWeight,
  //       projWeight: (field === "projWeight")  ?   validateWeight(value) : EditCourse.projWeight,
  //       examWeight: (field === "examWeight")  ?   validateWeight(value) : EditCourse.examWeight,
  //       quizWeight: (field === "quizWeight")  ?   validateWeight(value) : EditCourse.quizWeight
  //     })
  //   }

  //   const validateWeight = (value: string) => {
  //     var temp = parseFloat(value)

  //     if(temp === null || temp === undefined || Number.isNaN(temp))
  //       return 0

  //     else return temp
  //   }

  //   const CourseModal_Stage1 = (

  //     <form className={classes.root} noValidate autoComplete="off">

  //         <div style = {styles.modalHeader}> General Information </div>
  //         <div>
  //             <TextField
  //             value = {EditCourse.courseName}
  //             onChange = {(e) => {setModalInput("courseName", e.target.value)}}
  //             label = {"Class Name"}
  //             placeholder = "Math 101"
  //             variant = "filled"
  //             required={true}
  //             InputProps = {{ className: classes.textNormal}}
  //             InputLabelProps = {{ className: classes.textNormal}}
  //             className = {classes.textField}
  //             size = "small"
  //             />
  //         </div>

  //         <div>
  //             <TextField
  //             value = {EditCourse.email}
  //             onChange = {(e) => {setModalInput("email", e.target.value)}}
  //             label = {"Email"}
  //             placeholder = "Dude.Brochacho@gmail.com"
  //             variant = "filled"
  //             InputProps = {{ className: classes.textNormal}}
  //             InputLabelProps = {{ className: classes.textNormal }}
  //             className = {classes.textField}
  //             size = "small"
  //             />
  //         </div>

  //         <div>
  //             <TextField
  //             value = {EditCourse.hours}
  //             onChange = {(e) => {setModalInput("hours", e.target.value)}}
  //             label = {"Office Hours"}
  //             placeholder = "Mo/We 2:00pm - 3:45pm"
  //             variant = "filled"
  //             InputProps = {{ className: classes.textNormal}}
  //             InputLabelProps = {{ className: classes.textNormal}}
  //             className = {classes.textField}
  //             size = "small"
  //             />
  //         </div>

  //         <div>
  //             <TextField
  //             value = {EditCourse.latePolicy}
  //             onChange = {(e) => {setModalInput("latePolicy", e.target.value)}}
  //             label = {"Late Work Policy"}
  //             placeholder = "No late work allowed!"
  //             variant = "filled"
  //             InputProps = {{ className: classes.textNormal}}
  //             InputLabelProps = {{ className: classes.textNormal}}
  //             className = {classes.textField}
  //             size = "small"
  //             />
  //         </div>

  //         <div style = {{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           width: "100%",
  //           height: 40,
  //           paddingTop: 25
  //         }}>

  //           <CustomButton
  //           dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //           onClick = {() => cycleModalStage()}
  //           theme = "edit"
  //           title = "Next"
  //           />

  //           <CustomButton
  //           dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //           onClick = {() => closeModal()}
  //           theme = "delete"
  //           title = "Back"
  //           />
  //         </div>

  //     </form>

  // )

  // const CourseModal_Stage2 = (
  //   <form  className={classes.root} noValidate autoComplete="off">

  //     <div style = {styles.modalHeader}> Grading Scale </div>
  //     <div>
  //       <TextField
  //       value = {EditCourse.gradeScale}
  //       onChange = {(e) => {setModalInput("gradeScale", e.target.value)}}
  //       label = {"Grading Scale"}
  //       placeholder = "A- = 85%, B- = ..."
  //       variant = "filled"
  //       required = {true}
  //       InputProps = {{ className: classes.textNormal}}
  //       InputLabelProps = {{ className: classes.textNormal}}
  //       className = {classes.textField}
  //       size = "small"
  //       />
  //     </div>

  //     <div style = {{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           width: "100%",
  //           height: 40,
  //           paddingTop: 25
  //         }}>

  //         <CustomButton
  //         dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //         onClick = {() => cycleModalStage()}
  //         theme = "edit"
  //         title = "Next"
  //         />

  //         <CustomButton
  //         dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //         onClick = {() => closeModal()}
  //         theme = "delete"
  //         title = "Back"
  //         />
  //       </div>
  //   </form>
  // )

  // const CourseModal_Stage3 = (
  //   <form  className={classes.root} noValidate autoComplete="off">

  //     <div style = {styles.modalHeader}> Grade Weights </div>
  //     <div style = {styles.weightSection}>
  //       <div style = {styles.labelStyle} >Homework Percentage</div>

  //       <div style = {styles.weightRow}>
  //         <Slider
  //         name = "hwSlider"
  //         min = {0}
  //         max = {100}
  //         value = {EditCourse.hwWeight}
  //         onChange = {(event, value) => setModalInput("hwWeight", value.toString())}
  //         />

  //         <input
  //         style = {styles.inputStyle}
  //         type = "text"
  //         value = {EditCourse.hwWeight}
  //         onChange = {(e) => setModalInput("hwWeight", e.target.value)}
  //         />
  //         <text style = {styles.inputPost}>%</text>
  //       </div>

  //     </div>

  //     <div style = {{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           width: "100%",
  //           height: 40,
  //           paddingTop: 25
  //         }}>

  //         <CustomButton
  //         dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //         onClick = {() => submitModal()}
  //         theme = "edit"
  //         title = "Submit"
  //         />

  //         <CustomButton
  //         dimensions = {{ width: 70 , height: 40 , margin: 20 }}
  //         onClick = {() => closeModal()}
  //         theme = "delete"
  //         title = "Back"
  //         />
  //       </div>
  //   </form>
  // )

  return (
    <div style={styles.pageLayout}>
      <p>Courses</p>
      {/* <div 
      style = {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
      }}>
        <CustomButton
        title = "Add Class"
        onClick = {() => cycleModalStage()}
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
          editClick = {() => cycleModalStage()}
          deleteClick = {() => deleteCourse()}
          /> 
        ))}
      </div>

      <CustomModal
      layout = {(modalStage === "general") ? CourseModal_Stage1 : 
                (modalStage === "grading scale") ? CourseModal_Stage2 : 
                (modalStage === "grade weights") ? CourseModal_Stage3 :
                <form></form>}
      modalState = {cardModal}
      /> */}
    </div>
  );
};

const styles = create({
  pageLayout: {
    display: "grid",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
    fontWeight: "bold" as "bold",
  },

  weightSection: {
    display: "grid",
    gridTemplateRows: "auto auto",
    margin: 15,
    width: "90%",
  },

  weightRow: {
    display: "grid",
    gridTemplateColumns: "85% 10% 5%",
    columnGap: "1rem",
  },

  labelStyle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold" as "bold",
    height: 10,
  },

  inputStyle: {
    fontSize: 14,
    width: 45,
  },

  inputPost: {
    fontSize: 18,
  },
});
