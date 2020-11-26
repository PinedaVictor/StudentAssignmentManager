import { Button, createStyles, Dialog, DialogActions, DialogTitle, makeStyles, TextField, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_DELETE_BACKGROUND_COLOR,
        BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR, SECONDARY_COLOR, DEFAULT_TEXT_COLOR, FILL_OUT_FORM_BACKGROUND_FILL_COLOR } from '../../Styles/global';

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
                PaperProps={{
                    style: {
                        backgroundColor: SECONDARY_COLOR,
                        color: DEFAULT_TEXT_COLOR,
                        alignItems: 'center'
                    }
                }}
            >
                <DialogTitle
                    id="add-form"
                    disableTypography={true}
                    className={classes.title}
                >
                    {title}
                </DialogTitle>
                <div className={classes.textFields}>
                    {inputs.map(input => {
                        const invalid = input.isInvalid(input.value);
                        return <TextField 
                            InputProps={{classes: {root: classes.textFieldRoot, focused: classes.focus}}}
                            InputLabelProps={{classes: {root: classes.labelRoot}}}
                            margin='normal' variant='filled' fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
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
                PaperProps={{
                    style: {
                        backgroundColor: SECONDARY_COLOR,
                        color: DEFAULT_TEXT_COLOR,
                        alignItems: 'center'
                    }
                }}
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
        title: {
            fontSize: '26px',
        },
        labelRoot: {
            rontSize: '14px',
        },
        textFieldRoot : {
            color: DEFAULT_TEXT_COLOR,
            backgroundColor: FILL_OUT_FORM_BACKGROUND_FILL_COLOR,
        },
        focus: {
            color: DEFAULT_TEXT_COLOR,
            fontWeight: 'bolder',
            fontSize: '14px'
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