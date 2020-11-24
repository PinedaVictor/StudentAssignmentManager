import { Button, createStyles, Dialog, DialogActions, DialogTitle, makeStyles, TextField, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_DELETE_BACKGROUND_COLOR,
        BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR } from '../../Styles/global';

interface Inputs {
    id: string;
    label: string;
    value: string;
    placeHolder: string;
    isInvalid: (value: string) => boolean;
}

interface AddFormProps {
    title: string;
    openAdd: boolean;
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    handleFormAdd: () => void;
    inputs: Inputs[];
    setInputs: React.Dispatch<React.SetStateAction<Inputs[]>>;
}


export const AddForm = (addFormProps: AddFormProps) => {
    const [isInvalidData, setIsInvalidData] = useState(false);
    const {title, openAdd, setOpenAdd, handleFormAdd, inputs, setInputs} = addFormProps;
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();

    const clearInputs = () => {
        const newInputs = [...inputs];
        newInputs.forEach(input => input.value = '');
        setInputs(newInputs);
    }

    const handleFormCancel = () => {
        clearInputs();
        setOpenAdd(false);
    }
    const onTextChange = ({target: {id, value}} : any) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    }
    const handleCompleteFormAdd = () => {
        const validForms = inputs.every(input => !input.isInvalid(input.value));
        if(!validForms) {
            setIsInvalidData(true);
            return;
        }
        handleFormAdd();
        clearInputs();
        setOpenAdd(false);
    }
    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
    }
    return(
        <>
            <Dialog
                open={openAdd}
                onClose={handleFormCancel}
                fullScreen={isSmallDevice}
            >
                <DialogTitle id="add-form">{title}</DialogTitle>
                <div className={classes.textFields}>
                    {inputs.map(input => {
                        const invalid = input.isInvalid(input.value);
                        return <TextField variant='outlined' fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                            type="text" onChange={onTextChange} error={invalid} placeholder={input.placeHolder}/>
                    })}
                </div>
                <DialogActions>
                    <Button onClick={handleFormCancel} className={classes.cancelButton}>Cancel</Button>
                    <Button onClick={handleCompleteFormAdd} className={classes.addButton}>Add</Button>
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
            color: 'red',
        },
    })
);