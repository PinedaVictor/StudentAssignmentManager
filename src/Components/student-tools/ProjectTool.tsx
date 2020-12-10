import { AppBar, BottomNavigation, BottomNavigationAction,
         Button, createStyles, Grid, makeStyles, Theme, useMediaQuery, useTheme,
        Dialog, DialogTitle, DialogActions} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from 'firebase';

import { DEFAULT_TEXT_COLOR, SECONDARY_COLOR } from '../../Styles/global';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { DatabaseDocNames, Project, ProjectData } from '../../Database/utils';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { EditForm } from '../ReusableParts/EditForm';
import { app } from '../../Database/initFirebase';

const formatInfo = (info: string[]): Project => {
    let i = 0;
    
    let project: Project = {
        title: '', 
        completion: 0,
        grade: 0,
        DateDue: '',
        section_weight: 0,
        requirements: '',
        related_homework: [],
        resources: [],
    }

    project.title = info[i++];
    project.completion = parseInt(info[i++]);
    project.DateDue = info[i++];
    project.grade = isNaN(parseInt(info[i])) ? -1 : parseInt(info[i]);
    i++
    project.section_weight = parseInt(info[i++]);
    project.requirements = info[i++];
    project.related_homework = info[i].length === 0? [] : info[i].split(',');
    i++;
    project.resources = info[i].length === 0? [] : info[i].split(',');
    i++;
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
            hidden={value !== index}
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
                                    dueDate: element.DateDue,
                                    completion: element.completion + '%',
                                    grade: element.grade === -1 ? 'No grade yet' : element.grade + '%' ,
                                    sectionWeight: element.section_weight + '%',
                                }}
                                expandingData={{
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
    
    useEffect(() => {
        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid;

        const projectList = app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.projData)
            .onSnapshot(querySnapshot => {
                const projectList: ProjectData[] = [];
                querySnapshot.forEach(document => {
                    const projectData = document.data();
                    if(projectData) {
                        const tempProjectData = {
                            class: projectData.class,
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
    const [isInvalidSW, setIsInvalidSW] = useState(false);
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Title', value: '', placeHolder: 'Project #1',
         isInvalid: (value: string) => value === ''},
        {id: 'completion', label: 'Completion', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || (!/^\d{1,3}$/.test(value) || parseInt(value) > 100)},
        {id: 'duedate', label: 'Due Date', value: '', placeHolder: '4/20/71',
         isInvalid: (value: string) => isNaN(Date.parse(value))},
        {id: 'grade', label: 'Grade', value: '', placeHolder: '90',
         isInvalid: (value: string) => !/^\d{0,3}$/.test(value)},
        {id: 'section-weight', label: 'Section Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,3}$/.test(value)},
        {id: 'reqs', label: 'Requirements', value: '', placeHolder: 'Do...',
         isInvalid: () => false},
        {id: 'related-hw', label: 'Related Homework', value: '', placeHolder: 'HW #1, HW #2',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: '', placeHolder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);
    
    // FUNCTIONS
    const handleIsInvalidSW = () => {
        setIsInvalidSW(false);
    }

    const sectionWeightExceeds = (prevSW: number, newSW: number): boolean => {
        let currentSectionWeights = 0;
        projectData[tabValue].projects.forEach(project => currentSectionWeights += project.section_weight);
        currentSectionWeights -= prevSW;
        currentSectionWeights += newSW;

        return currentSectionWeights >= 100;
    }

    const handleFormAdd = async () => {
        const classID = projectData[tabValue].classID;
        const newProject = formatInfo(inputs.map(input => input.value));

        if(sectionWeightExceeds(0, newProject.section_weight)) {
            setIsInvalidSW(true);
            return;
        }
        
        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid;

        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.projData)
            .doc(classID)
            .update({
                projects: firebase.firestore.FieldValue
                    .arrayUnion(newProject),
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
        if(projectIndex === -1) {
            setIsInvalidData(true);
            setOpenEdit(true);
            return;
        }

        setCurrentProjectEdit(projectName);
        const oldProject = projectData[classIndex].projects[projectIndex];
        let i = 0;
        newInputs[i++].value = oldProject.title;
        newInputs[i++].value = oldProject.completion.toString();
        newInputs[i++].value = oldProject.DateDue;
        newInputs[i++].value = oldProject.grade.toString();
        newInputs[i++].value = oldProject.section_weight.toString();
        newInputs[i++].value = oldProject.requirements;
        newInputs[i++].value = oldProject.related_homework.join(', ');
        newInputs[i++].value = oldProject.resources.join(', ');
        setInputs(newInputs);
        setOpenEdit(true);
    }

    const handleFormEditSubmit = async () => {
        const projectIndex = projectData[tabValue].projects.findIndex(input => input.title === currentProjectEdit);

        if(projectIndex === -1) {
            setIsInvalidData(true);
            setOpenEdit(false);
            return;
        }

        const classID = projectData[tabValue].classID;
        const oldProjectName = projectData[tabValue].projects[projectIndex].title;
        
        const projectInfo = inputs.map(input => input.value);
        const newProject = formatInfo(projectInfo);
        
        if(sectionWeightExceeds(projectData[tabValue].projects[projectIndex].section_weight, newProject.section_weight)){
            setIsInvalidSW(true);
            return;
        }

        await handleDeleteButton(oldProjectName);

        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid;

        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.projData)
            .doc(classID)
            .update( {
                projects: firebase.firestore.FieldValue.arrayUnion(newProject),
            });

        setCurrentProjectEdit('');
    }

    const handleDeleteButton = async (projectName: string) => {
        const classID = projectData[tabValue].classID;
        const projectIndex = projectData[tabValue].projects.findIndex(project => project.title === projectName);

        if(projectIndex === -1){
            setIsInvalidData(true);
            return;
        }

        const deletable = projectData[tabValue].projects[projectIndex];

        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid;

        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.projData)
            .doc(classID)
            .update( {
                projects: firebase.firestore.FieldValue.arrayRemove(deletable),
            });
    }
    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
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
                { isSmallDevice ? 
                    <AppBar position="fixed" style={{top: 'auto', bottom: 0}}>
                        <BottomNavigation value={0} onChange={(event, newValue) => {}} className={classes.addProject}>
                            <BottomNavigationAction
                                icon={<AddCircleIcon className={classes.addProjectIcon}/> }
                                onClick={handleFormOpen}
                                disabled={projectData.length === 0}
                            />
                        </BottomNavigation>
                    </AppBar> :
                    <Box m={6}>
                        <Button
                            className={classes.addProject}
                            variant="contained"
                            startIcon={<AddCircleIcon />}
                            onClick={handleFormOpen}
                            disabled={projectData.length === 0}
                        >
                            Add Project
                        </Button>
                    </Box>
                }
                <Box p={6} m={isSmallDevice ? 2 : 4}>
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
                <Dialog
                    open={isInvalidData}
                    onClose={handleInvalidDataClose}
                    PaperProps={{
                        style: {
                            backgroundColor: SECONDARY_COLOR,
                            color: DEFAULT_TEXT_COLOR,
                            alignItems: 'center'
                        }
                    }}
                >
                    <DialogTitle>
                        {"Seems like the homework item doesn't exist anymore D:"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleInvalidDataClose} color='primary'>OK</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isInvalidSW}
                    onClose={handleInvalidDataClose}
                    PaperProps={{
                        style: {
                            backgroundColor: SECONDARY_COLOR,
                            color: DEFAULT_TEXT_COLOR,
                            alignItems: 'center'
                        }
                    }}
                >
                    <DialogTitle>
                        {"Seems like the total section weights exceeds 100 D:"}
                        <DialogActions>
                            <Button onClick={handleIsInvalidSW} color='primary'>OK</Button>
                        </DialogActions>
                    </DialogTitle>
                </Dialog>
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
        addProjectIcon: {
            color: DEFAULT_TEXT_COLOR,
            fontSize: 25,
        },
    })
);