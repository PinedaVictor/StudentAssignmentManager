import React from "react";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { HomeworkTool } from "../Components/student-tools/HomeworkTool";

export const Homework: React.FC = () => {
  return (
    <>
      <MainLayout />
      <HomeworkTool />
    </>
  );
};
