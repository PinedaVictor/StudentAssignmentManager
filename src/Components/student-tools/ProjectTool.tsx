import { Button, createStyles, Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from 'firebase';

import { DEFAULT_TEXT_COLOR, SECONDARY_COLOR } from '../../Styles/global';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { Project, ProjectData } from '../../Database/utils';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { EditForm } from '../ReusableParts/EditForm';
import { app } from '../../Database/initFirebase';

const formatInfo = (info: string[]): Project => {
    let i = 0;
    let project: Project = {
        title: info[i++], 
        completion: parseInt(info[i++]),
        section_weight: parseInt(info[i++]),
        overall_weight: parseInt(info[i++]),
        requirements: info[i++],
        related_homework: info[i].length === 0? [] : info[i++].split(','),
        resources: info[i].length === 0? [] : info[i++].split(','),
        DateCreated: Date(),
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
    const [projectData, setProjectData] = useState<ProjectData[]>([]);
    
    const firebaseUser = app.auth().currentUser;
    let currentUserID = "";
    if(firebaseUser) currentUserID = firebaseUser.uid;

    useEffect(() => {
        const projectList = app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ProjectData')
            .onSnapshot(querySnapshot => {
                const projectList: ProjectData[] = [];
                querySnapshot.forEach(document => {
                    const projectData = document.data();
                    if(projectData) {
                        const tempProjectData = {
                            class: projectData.Class,
                            classID: document.id,
                            projects: [...projectData.projects]
                        }
                        tempProjectData.projects.sort((a, b) => a.DateCreated < b.DateCreated ? 1 : -1)
                        projectList.push(tempProjectData);
                    }
                });
                setProjectData(projectList);
            });
        return () => projectList();
    }, []);
    // HOOKS
    const [currentProjectEdit, setCurrentProjectEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
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
    const handleFormAdd = async () => {
        const classID = projectData[tabValue].classID;
        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ProjectData')
            .doc(classID)
            .update({
                projects: firebase.firestore.FieldValue
                    .arrayUnion(formatInfo(inputs.map(input => input.value))),
            });
    }

    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }

    const handleFormOpen = () => {
        setOpenAdd(true);
    }

    const handleFormEdit = async (projectName: string) => {
        const newInputs = [...inputs];
        const classIndex = tabValue;
        const projectIndex = projectData[classIndex].projects.findIndex(input => input.title === projectName);

        // TODO set an error saying it no longer exists
        if(projectIndex === -1) return;

        setCurrentProjectEdit(projectName);
        const oldProject = projectData[classIndex].projects[projectIndex];
        let i = 0;
        newInputs[i++].value = oldProject.title;
        newInputs[i++].value = oldProject.completion.toString();
        newInputs[i++].value = oldProject.section_weight.toString();
        newInputs[i++].value = oldProject.overall_weight.toString();
        newInputs[i++].value = oldProject.requirements;
        newInputs[i++].value = oldProject.related_homework.join(', ');
        newInputs[i++].value = oldProject.resources.join(', ');
        setInputs(newInputs);
        setOpenEdit(true);
    }

    const handleFormEditSubmit = async () => {
        const projectIndex = projectData[tabValue].projects.findIndex(input => input.title === currentProjectEdit);

        if(projectIndex === -1) return;

        const classID = projectData[tabValue].classID;
        const oldProjectDateCreation = projectData[tabValue].projects[projectIndex].DateCreated;
        const oldProjectName = projectData[tabValue].projects[projectIndex].title;

        await handleDeleteButton(oldProjectName);

        const projectInfo = inputs.map(input => input.value);
        let i = 0;
        const newProject: Project = {
            title: projectInfo[i++],
            completion: parseInt(projectInfo[i++]),
            section_weight: parseInt(projectInfo[i++]),
            overall_weight: parseInt(projectInfo[i++]),
            requirements: projectInfo[i++],
            related_homework: projectInfo[i].length === 0 ? [] : projectInfo[i++].split(','),
            resources: projectInfo[i].length === 0 ? [] : projectInfo[i].split(','),
            DateCreated: oldProjectDateCreation,
        }
        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ProjectData')
            .doc(classID)
            .update( {
                projects: firebase.firestore.FieldValue.arrayUnion(newProject),
            });

        setCurrentProjectEdit('');
    }

    const handleDeleteButton = async (projectName: string) => {
        const classID = projectData[tabValue].classID;
        const projectIndex = projectData[tabValue].projects.findIndex(project => project.title === projectName);

        if(projectIndex === -1) return;

        const deletable = projectData[tabValue].projects[projectIndex];

        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ProjectData')
            .doc(classID)
            .update( {
                projects: firebase.firestore.FieldValue.arrayRemove(deletable),
            });
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
                        className={classes.addProject}
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
            color: DEFAULT_TEXT_COLOR,
            borderRadius: 10,
        },
        addProject: {
            backgroundColor: SECONDARY_COLOR,
            color: DEFAULT_TEXT_COLOR,
        },
    })
);