import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { HomeworkTool } from "../Components/student-tools/HomeworkTool";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const Homework: React.FC = () => {
  return (
    <>
      <MainLayout />
      <HomeworkTool />
    </>
  );
};
