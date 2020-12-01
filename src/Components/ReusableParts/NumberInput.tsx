import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { BORDER_COLOR, BORDER_COLOR_HOVER } from '../../Styles/global';

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
        width: "9ch",
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