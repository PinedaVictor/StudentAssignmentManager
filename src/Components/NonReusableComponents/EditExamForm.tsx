import { Dialog, DialogActions, DialogTitle,
         Button, TextField,
         useMediaQuery, useTheme, makeStyles, Theme, createStyles, 
       } from '@material-ui/core';
import React from 'react';
import {ExamData} from '../student-tools/utils';

interface EditExamProps {
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    examData: ExamData[];
    setExamData: React.Dispatch<React.SetStateAction<ExamData[]>>;
    classIndex: number;
}

export const EditExam = (editProps: EditExamProps) => {
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const {openEdit, setOpenEdit, examData, setExamData, classIndex} = editProps;
    const handleFormCancel = () => {
        setOpenEdit(false);
    };

    return (
        <>
            <Dialog
                open={openEdit}
                onClose={handleFormCancel}
                fullScreen={isSmallDevice}
            >
                <DialogTitle id="edit-form-dialog-title">Edit Exam</DialogTitle>

            </Dialog>
        </>
    )
}