import React from 'react';
import { MainLayout } from '../Components/ReusableParts/Layout';
import { ProjectTool } from '../Components/student-tools/ProjectTool';

export const Project: React.FC = () => {
    return (
        <>
            <MainLayout />
            <ProjectTool />
        </>
    )
}