import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

interface Props {
    label: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    value: number
}

export const NumberInput: React.FC<Props> = ({label, onChange, value}) => {

    const classes = useStyles();

    return (
        <TextField
        className = {classes.root}
        id="outlined-number"
        label={label}
        type="number"
        value = {value}
        size = "small"
        variant = "outlined"
        onChange = {onChange}
        InputProps = {{ className: classes.textInput}}
        InputLabelProps = {{className: classes.textLabel}}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "9ch"
    },

    textInput: {
      fontSize: "1.2em"
    },
  
    textLabel: {
      fontSize: "1.4em",
      fontWeight: "bold"
    }
  }))