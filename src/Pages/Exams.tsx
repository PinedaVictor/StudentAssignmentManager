import { Box, Button } from "@material-ui/core";
import React from "react";
import { Container} from "react-bootstrap";
import { MainLayout } from "../Components/ReusableParts/Layout";
import { ExamsTools } from "../Components/student-tools/ExamsTools";

export const Exams: React.FC = () => {
    return (
        <Container fluid>
            <MainLayout />
            <ExamsTools/>
        </Container>
    );
};