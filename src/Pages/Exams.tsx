import React from "react";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { ExamsTools } from "../Components/student-tools/ExamsTools";

export const Exams: React.FC = () => {
    return (
        <>
            <MainLayout />
            <ExamsTools/>
        </>
    );
};