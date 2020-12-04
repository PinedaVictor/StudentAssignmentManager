import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AQUA, PRIMARY_COLOR } from "../../Styles/global";
import { app } from "../../Database/initFirebase";

export const Logout: React.FC = () => {
  const firebase_User = app.auth().currentUser;
  let currentUserID = "";
  if (firebase_User) {
    currentUserID = firebase_User.uid;
  }

  const logoutUser = () => {
    if (currentUserID) {
      app.auth().signOut();
    }
  };
  return (
    <IconButton
      onClick={logoutUser}
      style={{ backgroundColor: AQUA, color: PRIMARY_COLOR }}
    >
      <ExitToAppIcon style={{ width: "1.5em", height: "1.5em" }} />
    </IconButton>
  );
};
