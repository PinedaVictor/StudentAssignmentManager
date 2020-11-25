import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme, makeStyles, responsiveFontSizes, Typography } from '@material-ui/core';
import { BORDER_COLOR, SECONDARY_COLOR } from '../../Styles/global';

interface Props {
    title?: string
    layout: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    modalState: boolean
}

export const CustomPopup: React.FC<Props> = ({title, layout, modalState}) => {

    let fontTheme = createMuiTheme();
    fontTheme = responsiveFontSizes(fontTheme);
    const classes = useStyles()

    return (
        <Dialog
        classes = {{paper: classes.paper}}
        open = {modalState}
        aria-labelledby="responsive-dialog-title"
        scroll = "paper"
        disableBackdropClick
        maxWidth = {false}
        >
            {(title !== undefined && title !== null) &&
            <DialogTitle id="responsive-dialog-title">
                <ThemeProvider theme = {fontTheme}>
                    <Typography variant = "h2" style = {{textAlign: "center"}} >{title}</Typography>
                </ThemeProvider>
            </DialogTitle>}

            <DialogContent dividers = {(title !== undefined && title !== null) ? true : false}>
                {layout}
            </DialogContent>

        </Dialog>
    )
}

const useStyles = makeStyles(() => ({
    
    paper: {
        width: "90%",
        backgroundColor: SECONDARY_COLOR,
        color: "white",
        border: "1px solid",
        borderColor: BORDER_COLOR
    }
  }))