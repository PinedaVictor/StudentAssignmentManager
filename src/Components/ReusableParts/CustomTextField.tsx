import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

interface Props {
    label: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    value: string,
    placeholder: string,
    multiline?: boolean
}

export const CustomTextField: React.FC<Props> = ({label, onChange, value, placeholder, multiline}) => {

    const classes = useStyles();

    return (
        <TextField
        id = "outlined-text"
        label = {label}
        variant = "outlined"
        size = "medium"
        value = {value}
        onChange = {onChange}
        placeholder = {placeholder}
        InputProps = {{ className: classes.textInput}}
        InputLabelProps = {{className: classes.textLabel}}
        fullWidth
        multiline = {(multiline !== undefined && multiline !== null) ? true : false}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    
    textInput: {
      fontSize: "1.2em"
    },
  
    textLabel: {
      fontSize: "1.4em",
      fontWeight: "bold"
    }
  }))