import React from 'react';
import { Checkbox, FormControlLabel, Typography, withStyles } from '@material-ui/core';
import { BORDER_COLOR } from '../../Styles/global';

interface Props {
    label: string,
    state: boolean,
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
}

export const CustomCheckbox: React.FC<Props> = ({label, state, onChange}) => {

    return (

        <FormControlLabel
    label = {<Typography variant="h6" style={{ color: "white" }}>{label}</Typography>}
        control = {
            <StyledCheckbox
            checked = {state}
            onChange = {onChange}
            size = "medium"
            />
        }
        />

        
    )
}

const StyledCheckbox = withStyles(theme => ({
    root: {
      color: BORDER_COLOR,
      transform: "scale(1.75)",
      "&$checked": {
        color: "green",
        transform: "scale(1.5)"
      },
    },

    checked: {
    }
  }))(Checkbox);