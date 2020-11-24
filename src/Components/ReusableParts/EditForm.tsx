import { Button, createStyles, DialogActions, DialogTitle, makeStyles, TextField, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR } from '../../Styles/global';

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
    inputs: Inputs[];
    setInputs: React.Dispatch<React.SetStateAction<Inputs[]>>;
}

export const EditForm = (editFormProps: EditFormProps) => {
    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    //DATA
    const { title, openEdit, setOpenEdit, inputs, setInputs } = editFormProps;
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();
    // FUNCTIONS
    const handleFormCancel = () => {
        setOpenEdit(false);
    }

    return (
        <>
            <Dialog
                open={openEdit}
                onClose={handleFormCancel}
                fullScreen={isSmallDevice}
            >
                <DialogTitle id='edit-form'>{title}</DialogTitle>
            </Dialog>
            <div className={classes.textFields}>
                {inputs.map(input => {
                    const invalid = input.isInvalid(input.value);
                    return <TextField fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                        type="text" /* onChange={onTextChange} */ error={invalid} placeholder={input.placeHolder}/>
                })}
            </div>
            <DialogActions>
                <Button onClick={handleFormCancel} className={classes.cancelButton}>Cancel</Button>
                <Button onClick={/* handleCompleteFormAdd */ () => {}} className={classes.addButton}>Add</Button>
            </DialogActions>
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