import React from "react";
import { Header } from "../../Navigation/Header";

export const MainLayout: React.FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
