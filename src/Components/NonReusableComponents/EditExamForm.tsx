import { Dialog, DialogActions, DialogTitle,
         Button, TextField,
         useMediaQuery, useTheme, makeStyles, Theme, createStyles, 
       } from '@material-ui/core';
import React, { useState } from 'react';
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR,
         BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR
       } from '../../Styles/global';
import {Exam, ExamData} from '../student-tools/utils';

interface EditExamProps {
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    examData: ExamData[];
    setExamData: React.Dispatch<React.SetStateAction<ExamData[]>>;
    classIndex: number;
    examName: string;
    exam: Exam;
}

export const EditExam = (editProps: EditExamProps) => {
    //DATA
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();
    const {openEdit, setOpenEdit, examData, setExamData, classIndex, examName, exam} = editProps;
    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam Title', value: exam.title, placeholder: 'Exam #1',
         isInvalid: (value: string) => value === '' },
        {id: 'section-weight', label: 'Section Weight', value: exam.section_weight, placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: exam.overall_weight, placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'related-hw', label: 'Related Homework', value: exam.related_hw, placeholder: 'HW #1, HW #2',
         isInvalid: value => false},
        {id: 'related-projs', label: 'Related Projects', value: exam.related_projs, placeholder: 'Project #1, Project #2',
         isInvalid: () => false},
        {id: 'related-exams', label: 'Related Exams', value: exam.related_exams, placeholder: 'Exam #1, Exam #2',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: exam.resources, placeholder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);

    // FUNCTIONS
    const handleFormCancel = () => {
        setOpenEdit(false);
    };
    const onTextChange = ({target: {id, value}} :any) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    };
    
    const handleFormEdit = () => {
        console.log(examName);
        const validForm = inputs.every(input => !input.isInvalid(input.value));
        if(!validForm) {
            setIsInvalidData(true);
            return;
        }
    }
    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
    }

    return (
        <>
            <Dialog
                open={openEdit}
                onClose={handleFormCancel}
                fullScreen={isSmallDevice}
            >
                <DialogTitle id="edit-form-dialog-title">Edit Exam</DialogTitle>
                <div className={classes.textFields}>
                    {inputs.map(input => {
                        const invalid = input.isInvalid(input.value);
                        return <TextField fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                            type="text" onChange={onTextChange} error={invalid} placeholder={input.placeholder}/>
                    })}
                </div>
                <DialogActions>
                    <Button onClick={handleFormCancel} className={classes.cancelButton}>Cancel</Button>
                    <Button onClick={handleFormEdit} className={classes.addButton}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isInvalidData}
                onClose={handleInvalidDataClose}
            >
                <DialogTitle id='invalid-data' className={classes.invalid}>
                    {"One or more data entries are invalid"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleInvalidDataClose} color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFields: {
            justify: 'space-between',
            alignItems: 'center',
            margin: '5%',
        },
        addButton: {
            backgroundColor: BUTTON_EDIT_BACKGROUND_COLOR,
            '&:hover': {
                backgroundColor: BUTTON_EDIT_HOVER_BACKGROUND_COLOR,
            }
        },
        cancelButton: {
            backgroundColor: BUTTON_DELETE_BACKGROUND_COLOR,
            '&:hover': {
                backgroundColor: BUTTON_DELETE_HOVER_BACKGROUND_COLOR,
            }
        },
        invalid: {
            color: 'red'
        }
    })
);