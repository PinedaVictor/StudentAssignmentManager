import React from "react";
import { Home } from "../Components/student-tools/Home"
import "../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import { MainLayout } from "../Components/ReusableParts/Layout";

export const Main: React.FC = () => {
  return (
    <>
      <MainLayout />
      <Home/>
    </>
  );
};
