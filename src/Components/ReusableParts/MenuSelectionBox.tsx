import React from 'react';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';

interface Props {
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    options: Array<string>,
    width?: string
}

export const MenuSelectionBox: React.FC<Props> = ({label, onChange, value, options, width}) => {

    const classes = useStyles();

    const getWidth = () => {
        if (width !== undefined && width !== null)
            return width

        else return "18ch"
    }
    
    return (
        <TextField
        style = {{
            width: getWidth()
        }}
        id="standard-select"
        label={label}
        select
        value = {value}
        size = "small"
        variant = "outlined"
        onChange = {onChange}
        InputProps = {{ className: classes.textInput}}
        InputLabelProps = {{className: classes.textLabel}}
        fullWidth
        >
            {
                options.map((option) => (
                    <MenuItem key = {option} value = {option}>
                        {option}
                    </MenuItem>
                ))
            }
        </TextField>
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