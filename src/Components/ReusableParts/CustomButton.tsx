import React from 'react';
import {
  withStyles,
  Theme,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BUTTON_EDIT_BACKGROUND_COLOR , BUTTON_EDIT_HOVER_BACKGROUND_COLOR , BUTTON_DELETE_BACKGROUND_COLOR , BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_DEFAULT_BACKGROUND_COLOR, BUTTON_DEFAULT_HOVER_BACKGROUND_COLOR } from '../../Styles/global';
import { Typography } from '@material-ui/core';

interface Props {
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
    title: string,
    theme?:  "edit" | "delete",
    size?: "small" | "medium" | "large"
}

let typoTheme = createMuiTheme();
typoTheme = responsiveFontSizes(typoTheme);

export const CustomButton: React.FC<Props> = ({onClick, title, theme, size}) => {
    
    const getBackground = () => {

        if (theme === undefined || theme === null)
            return BUTTON_DEFAULT_BACKGROUND_COLOR

        else if (theme === "edit")
            return BUTTON_EDIT_BACKGROUND_COLOR

        else if (theme === "delete")
            return BUTTON_DELETE_BACKGROUND_COLOR
    }

    const getBackgroundHover = () => {
        if (theme === undefined || theme === null)
            return BUTTON_DEFAULT_HOVER_BACKGROUND_COLOR

        else if (theme === "edit")
            return BUTTON_EDIT_HOVER_BACKGROUND_COLOR

        else if (theme === "delete")
            return BUTTON_DELETE_HOVER_BACKGROUND_COLOR
    }

    const ColorButton = withStyles(() => ({
    root: {
        color: "black",
        backgroundColor: getBackground,
        fontSize: 12,
        fontWeight: "bold" as "bold",
        border: "1px solid black",
        boxShadow: "2px 2px 2px rgba(0,0,0,0.25)",

        '&:hover': {
        backgroundColor: getBackgroundHover,
        boxShadow: "4px 4px 4px rgba(0,0,0,0.35)",
        transition: "all .35s ease",
        },
    },
    }))(Button);

    return (
        <div>
            <ColorButton 
            onClick={onClick}
            size = {(size !== undefined && size !== null) ? size : "small"}
            >
                <ThemeProvider theme = {typoTheme}>
                    <Typography variant = "h6">{title}</Typography>
                </ThemeProvider>
            </ColorButton>
        </div>
    );
}