import React from 'react';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import { BORDER_COLOR, BORDER_COLOR_HOVER } from '../../Styles/global';

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
        className = {classes.root}
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
        SelectProps = {{classes: {icon: classes.iconRoot}}}
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
    },

    iconRoot: {
        fill: "white"
    }
  }))