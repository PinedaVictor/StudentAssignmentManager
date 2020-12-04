import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AQUA, PRIMARY_COLOR } from "../../Styles/global";

export const Logout: React.FC = () => {
  return (
    <IconButton style={{ backgroundColor: AQUA, color: PRIMARY_COLOR }}>
      <ExitToAppIcon style={{ width: "1.5em", height: "1.5em" }} />
    </IconButton>
  );
};
