import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import {CustomButton} from "./CustomButton"

interface Dimension {
  [key: string] : any
}
interface Props {
    layout: ReactElement,
    buttonTitle: string,
    buttonDimensions: Dimension,
    buttonTheme: "default" | "edit" | "delete"
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export const CustomModal: React.FC<Props> = ({layout, buttonTitle, buttonDimensions, buttonTheme}) => {
  const classes = useStyles();
  const [modalState, setModalState] = React.useState(false);

  const handleOpen = () => {
    setModalState(true);
  };

  const handleClose = () => {
    setModalState(false);
  };

  return (
    <div>
        <CustomButton 
        onClick = {handleOpen}
        dimensions = {buttonDimensions}
        title={buttonTitle}
        theme = {buttonTheme}
        />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalState}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <div className={classes.paper}>
            {layout}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}