import React from 'react';
import { makeStyles, Slider } from '@material-ui/core';
import { BORDER_COLOR, BORDER_COLOR_HOVER } from '../../Styles/global';

interface Props {
    min: number,
    max: number,
    onChange: ((event: React.ChangeEvent<{}>, value: number | number[]) => void),
    value: number
}

export const CustomSlider: React.FC<Props> = ({min, max, onChange, value}) => {

    const classes = useStyles();

    return (
        <Slider
        className = {classes.root}
        min = {min}
        max = {max}
        value = {value}
        onChange = {onChange}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        fill: "white",
        color: "white"
    },
  }))