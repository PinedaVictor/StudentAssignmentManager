import React from 'react';
import { useParams } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { Container }  from 'react-bootstrap';
import { MainLayout } from '../Components/ReusableParts/Layout';
import { EditExamTool } from '../Components/student-tools/EditExamsTool';

interface ExamDetails {
    className: string,
    examNumber: string,
}

export const EditExams: React.FC = () => {
    const {className, examNumber}= useParams<ExamDetails>();

    return (
        <>
            <MainLayout />
            <EditExamTool className={className} examNumber={examNumber} />
        </>
    )
}