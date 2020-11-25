import { Button, createStyles, DialogActions, DialogTitle, makeStyles, TextField, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR, SECONDARY_COLOR } from '../../Styles/global';

interface Inputs {
    id: string;
    label: string;
    value: string;
    placeHolder: string;
    isInvalid: (value: string) => boolean;
}

interface EditFormProps {
    title: string;
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    handleFormEditSubmit: () => void;
    inputs: Inputs[];
    setInputs: React.Dispatch<React.SetStateAction<Inputs[]>>;
}

export const EditForm = (editFormProps: EditFormProps) => {
    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    //DATA
    const { title, openEdit, setOpenEdit, handleFormEditSubmit, inputs, setInputs } = editFormProps;
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();
    // FUNCTIONS    
    const clearInputs = () => {
        const newInputs = [...inputs];
        newInputs.forEach(input => input.value = '');
        setInputs(newInputs);
    }
    const handleFormCancel = () => {
        clearInputs();
        setOpenEdit(false);
    }
    const onTextChange = ({target: {id, value}} : any) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    }
    const handleCompleteFormEdit = () => {
        const validForms = inputs.every(input => !input.isInvalid(input.value));
        if(!validForms) {
            setIsInvalidData(true);
            return;
        }
        handleFormEditSubmit();
        clearInputs();
        setOpenEdit(false);
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
                PaperProps={{
                    style: {
                        backgroundColor: SECONDARY_COLOR,
                        color:'white'
                    }
                }}
            >
                <DialogTitle id='edit-form'>{title}</DialogTitle>
                <div className={classes.textFields}>
                    {inputs.map(input => {
                        const invalid = input.isInvalid(input.value);
                        return <TextField className={classes.singleTextField}  margin='normal' variant='outlined' fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                            type="text" onChange={onTextChange} error={invalid} placeholder={input.placeHolder}/>
                    })}
                </div>
                <DialogActions>
                    <Button onClick={handleFormCancel} className={classes.cancelButton}>Cancel</Button>
                    <Button onClick={handleCompleteFormEdit} className={classes.addButton}>Submit</Button>
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
        dialog: {
            color: SECONDARY_COLOR,
            backgroundColor: SECONDARY_COLOR,
        },
        textFields: {
            justify: 'space-between',
            alignItems: 'center',
            margin: '5%',
        },
        singleTextField: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: '#DEDEDE'
              },
            "& .MuiInputLabel-outlined": {
                color: "#DEDEDE",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "white",
            },

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