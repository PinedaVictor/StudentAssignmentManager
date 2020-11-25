import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { BORDER_COLOR, BORDER_COLOR_HOVER } from '../../Styles/global';

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
        className = {classes.root}
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
    root: {
      backgroundColor: "#151515",
      border: "1px solid",
      borderColor: BORDER_COLOR,
      borderRadius: 5,

      '&:hover': {
        border: "1px solid",
        borderColor: BORDER_COLOR_HOVER
      }
    },

    textInput: {
      fontSize: "1.2em",
      color: "white"
    },
  
    textLabel: {
      fontSize: "1.4em",
      fontWeight: "bold",
      color: "white"
    }
  }))