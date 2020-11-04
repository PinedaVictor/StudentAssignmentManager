import React from 'react';
import {
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BUTTON_EDIT_BACKGROUND_COLOR , BUTTON_EDIT_HOVER_BACKGROUND_COLOR , BUTTON_DELETE_BACKGROUND_COLOR , BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_DEFAULT_BACKGROUND_COLOR, BUTTON_DEFAULT_HOVER_BACKGROUND_COLOR } from '../../Styles/global';

interface Dimension {
    [key: string] : any
}

interface Props {
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
    dimensions?: Dimension,
    title: string,
    theme?: "default" | "edit" | "delete"
}

export const CustomButton: React.FC<Props> = ({onClick, dimensions, title, theme}) => {
    
    const getBackground = () => {

        if (theme === "default" || theme === undefined || theme === null)
            return BUTTON_DEFAULT_BACKGROUND_COLOR

        else if (theme === "edit")
            return BUTTON_EDIT_BACKGROUND_COLOR

        else if (theme === "delete")
            return BUTTON_DELETE_BACKGROUND_COLOR
    }

    const getBackgroundHover = () => {
        if (theme === "default" || theme === undefined || theme === null)
            return BUTTON_DEFAULT_HOVER_BACKGROUND_COLOR

        else if (theme === "edit")
            return BUTTON_EDIT_HOVER_BACKGROUND_COLOR

        else if (theme === "delete")
            return BUTTON_DELETE_HOVER_BACKGROUND_COLOR
    }

    const ColorButton = withStyles((theme: Theme) => ({
    root: {
        color: "black",
        backgroundColor: getBackground,
        fontSize: 12,
        fontWeight: "bold" as "bold",
        border: "1px solid black",
        '&:hover': {
        backgroundColor: getBackgroundHover,
        },
    },
    }))(Button);

    return (
        <div>
            <ColorButton 
            style={(dimensions !== undefined && dimensions !== null) ? dimensions : {width: 70 , height: 35}} 
            onClick={onClick}>
                {title}
            </ColorButton>
        </div>
    );
}