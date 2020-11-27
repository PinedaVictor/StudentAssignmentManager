import { Button, createStyles, Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { SECONDARY_COLOR } from '../../Styles/global';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { Project, ProjectData } from '../../Database/utils';
import { ProjectDataJson } from '../../Database/PlaceHolderData';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { EditForm } from '../ReusableParts/EditForm';

const fetchProjectData = () => {
    return ProjectDataJson;
}

const formatInfo = (info: string[]): Project => {
    let i = 0;
    let project: Project= {
        title: info[i++], 
        completion: info[i++],
        section_weight: info[i++],
        overall_weight: info[i++],
        requirements: info[i++],
        related_homework: info[i].length === 0? [] : info[i++].split(','),
        resources: info[i].length === 0? [] : info[i++].split(','),
    }
    return project;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    projectInfo: ProjectData;
    delete: (projectName: string) => void;
    edit: (examName: string) => void;
}
const TabPanels = (props: TabPanelProps) => {
    const {children, value, index, projectInfo, ...func} = props;

    return (
        <div
            role="tabpanel"
            hidden={value != index}
        >
            {value === index && (
                <Grid container
                    spacing={3}
                    justify='center'
                    alignItems='stretch'
                    direction='row'
                >
                    {projectInfo.projects.map((element, index) => (
                        <Grid item
                            xs={12}
                            sm={9}
                            md={5}
                            lg={4}
                            xl={4}
                            key={element.title}
                        >
                            <CustomCardStandard
                                title={element.title}
                                data={{
                                    sectionWeight: element.section_weight + '%',
                                    overallWeight: element.overall_weight + '%',
                                    completion: element.completion + '%',
                                    requirements: element.requirements,
                                    relatedHomework: element.related_homework,
                                    resources: element.resources,
                                }}
                                editClick={() => func.edit(element.title)}
                                deleteClick={() => func.delete(element.title)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    )
}
export const ProjectTool: React.FC = () => {
    // HOOKS
    const [currentProjectEdit, setCurrentProjectEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [projectData, setProjectData] = useState<ProjectData[]>(fetchProjectData());
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Title', value: '', placeHolder: 'Project #1',
         isInvalid: (value: string) => value === ''},
        {id: 'completion', label: 'Completion', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'section-weight', label: 'Section Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'reqs', label: 'Requirements', value: '', placeHolder: 'Do...',
         isInvalid: () => false},
        {id: 'related-hw', label: 'Related Homework', value: '', placeHolder: 'HW #1, HW #2',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: '', placeHolder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);
    // FUNCTIONS
    const handleFormAdd = () => {
        const newProjectData =[...projectData];
        // TODO need to make db calls here
        const projectInfo = inputs.map(input => input.value);
        if(projectData[tabValue].projects)
            newProjectData[tabValue].projects= [...newProjectData[tabValue].projects, formatInfo(projectInfo)];
        setProjectData(newProjectData);
    }
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }
    const handleFormOpen = () => {
        setOpenAdd(true);
    }
    const handleFormEdit = (projectName: string) => {
        const newInputs = [...inputs];
        const classIndex = tabValue;
        const projectIndex = projectData[classIndex].projects.findIndex(input => input.title === projectName);

        // TODO set an error saying it no longer exists
        if(projectIndex === -1) return;

        setCurrentProjectEdit(projectName);
        const oldProject = projectData[classIndex].projects[projectIndex];
        let i = 0;
        newInputs[i++].value = oldProject.title;
        newInputs[i++].value = oldProject.completion;
        newInputs[i++].value = oldProject.section_weight;
        newInputs[i++].value = oldProject.overall_weight;
        newInputs[i++].value = oldProject.requirements;
        newInputs[i++].value = oldProject.related_homework.join(', ');
        newInputs[i++].value = oldProject.resources.join(', ');
        setInputs(newInputs);
        setOpenEdit(true);
    }
    const handleFormEditSubmit = () => {
        const newProjectData = [...projectData];
        const projectInfo = inputs.map(input => input.value);
        const classIndex = tabValue;
        const projectIndex = projectData[classIndex].projects.findIndex(input => input.title === currentProjectEdit);

        if(projectIndex === -1) return;
        
        let i = 0;
        newProjectData[classIndex].projects[projectIndex].title = projectInfo[i++];
        newProjectData[classIndex].projects[projectIndex].completion = projectInfo[i++];
        newProjectData[classIndex].projects[projectIndex].section_weight = projectInfo[i++];
        newProjectData[classIndex].projects[projectIndex].overall_weight = projectInfo[i++];
        newProjectData[classIndex].projects[projectIndex].requirements = projectInfo[i++];
        newProjectData[classIndex].projects[projectIndex].related_homework = projectInfo[i].length === 0 ? [] : projectInfo[i++].split(',');
        newProjectData[classIndex].projects[projectIndex].resources = projectInfo[i].length === 0 ? [] : projectInfo[i].split(',');

        // DB call right here to update
        setCurrentProjectEdit('');
        setProjectData(newProjectData);
    }
    const handleDeleteButton = (projectName: string) => {
        const newProjectData = [...projectData];
        const classIndex = tabValue;
        // TODO make sure deletion updates the DB
        const examIndex = projectData[classIndex].projects.findIndex(project => project.title === projectName);
        newProjectData[classIndex].projects.splice(examIndex, 1);
        setProjectData(newProjectData);
    }
    // DATA
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();
    return (
        <>
            <Box textAlign='center' m={isSmallDevice ? 0 : 6}>
                <CustomScrollableTabs
                    className={classes.tabs}
                    tabValue={tabValue}
                    onChange={handleNavChange}
                    tabNames={projectData.map(element => element.class)}
                />
                <Box m={6}>
                    <Button
                        disabled={ projectData.length === 0 }
                        className={classes.addProjectExam}
                        variant='contained'
                        startIcon={<AddCircleIcon />}
                        onClick={handleFormOpen}
                    >
                        Add
                    </Button>
                </Box>
                <Box m={6}>
                    {projectData.map((element, index) => {
                        return <TabPanels
                                    value={tabValue}
                                    index={index}
                                    projectInfo={element}
                                    key={element.class}
                                    delete={handleDeleteButton}
                                    edit={handleFormEdit}
                                />
                    })}
                </Box>
                <AddForm
                    title='Add Project'
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                    handleFormAdd={handleFormAdd}
                    inputs={inputs}
                    setInputs={setInputs}
                />
                <EditForm
                    title='Edit Project'
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    handleFormEditSubmit={handleFormEditSubmit}
                    inputs={inputs}
                    setInputs={setInputs}
                />
            </Box>
        </>
    )
}
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        tabs: {
            backgroundColor: SECONDARY_COLOR,
            color: 'white',
            borderRadius: 10,
        },
        addProjectExam: {
            backgroundColor: SECONDARY_COLOR,
            color: 'white'
        },
    })
);