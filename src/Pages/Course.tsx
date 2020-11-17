import React from "react";
import { MainLayout } from "../Components/ReusableParts/Layout";

import {Courses} from "../Components/student-tools/Courses"

export const Course: React.FC = () => {
  return (
    <>
      <MainLayout />
      <Courses />
    </>
  );
};
