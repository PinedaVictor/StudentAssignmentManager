import { Dialog, DialogActions, DialogTitle,
         Button, TextField,
         useMediaQuery, useTheme, makeStyles, Theme, createStyles, 
       } from '@material-ui/core';
import React, { useState } from 'react';
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR,
         BUTTON_EDIT_HOVER_BACKGROUND_COLOR } from '../../Styles/global';
import { ExamData, Exam } from '../../Database/utils';

interface AddExamProps {
    openAdd: boolean,
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    examData: ExamData[];
    setExamData: React.Dispatch<React.SetStateAction<ExamData[]>>;
    classIndex: number;
}

const formatInfo = (info: string[]): Exam => {
    let i = 0;
    let exam: Exam = {
        title: info[i++], 
        section_weight: info[i++],
        overall_weight: info[i++],
        related_hw: info[i++],
        related_projs: info[i++],
        related_exams: info[i++],
        resources: info[i],
    }
    return exam;
}

export const AddExam = (addExamProps: AddExamProps) => {
    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam Title', value: '', placeholder: 'Exam #1',
         isInvalid: (value: string) => value === '' },
        {id: 'section-weight', label: 'Section Weight', value: '', placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: '', placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'related-hw', label: 'Related Homework', value: '', placeholder: 'HW #1, HW #2',
         isInvalid: value => false},
        {id: 'related-pros', label: 'Related Projects', value: '', placeholder: 'Project #1, Project #2',
         isInvalid: () => false},
        {id: 'related-exams', label: 'Related Exams', value: '', placeholder: 'Exam #1, Exam #2',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: '', placeholder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);
    
    // DATA
    const {openAdd, setOpenAdd, examData, setExamData, classIndex} = addExamProps;
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();

    // FUNCTIONS
    const clearInputs = () =>{
        const newInputs = [...inputs];
        newInputs.forEach(input => input.value = '');
        setInputs(newInputs);
    }
    const handleFormCancel= () => {
        clearInputs();
        setOpenAdd(false);
    };
    const onTextChange = ({target: {id, value}} : any) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    }
    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
    }

    // TODO ADD DB INTERACTION
    const handleFormAdd = () => {
        const validForm = inputs.every(input => !input.isInvalid(input.value));
        if(!validForm){
            setIsInvalidData(true);
            return;
        }
        const newExamData = [...examData];
        // TODO need to make db calls here
        const examInfo = inputs.map(input => input.value);
        const newExam = formatInfo(examInfo);
        if(examData[classIndex].exams)
            newExamData[classIndex].exams = [...examData[classIndex].exams, newExam];
        clearInputs();
        setExamData(newExamData);
        setOpenAdd(false);
    }
    return (
        <>
            <Dialog
                open={openAdd}
                onClose={handleFormCancel}
                fullScreen={isSmallDevice}
            >
                <DialogTitle id="add-form-dialog-title">Adding Exam</DialogTitle>
                <div className={classes.textFields}>
                    {inputs.map(input => {
                        const invalid = input.isInvalid(input.value);
                        return <TextField fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                            type="text" onChange={onTextChange} error={invalid} placeholder={input.placeholder}/>
                    })}
                </div>
                <DialogActions>
                    <Button onClick={handleFormCancel} className={classes.cancelButton}>Cancel</Button>
                    <Button onClick={handleFormAdd} className={classes.addButton}>Add</Button>
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
};

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
            color: 'red',
        },
    })
);