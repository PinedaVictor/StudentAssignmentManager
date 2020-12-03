import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, createStyles, Dialog, DialogActions, DialogTitle, Grid, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Homework, HomeworkData } from '../../Database/utils';
import { DEFAULT_TEXT_COLOR, SECONDARY_COLOR } from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { EditForm } from '../ReusableParts/EditForm';
import { app } from '../../Database/initFirebase';
import firebase from 'firebase';

const formatInfo = (info: string[]): Homework => {
    let i = 0;
    let homework: Homework = {
        title: info[i++], 
        completion: parseInt(info[i++]),
        section_weight: parseInt(info[i++]),
        overall_weight: parseInt(info[i++]),
        requirements: info[i++],
        resources: info[i].length === 0? [] : info[i++].split(','),
        DateCreated: Date(),
    }
    return homework;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    homeworkInfo: HomeworkData;
    delete: (projectName: string) => void;
    edit: (examName: string) => void;
}

const TabPanels = (props: TabPanelProps) => {
    const {children, value, index, homeworkInfo, ...func} = props;

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
                    {homeworkInfo.homeworks.map((element, index) => (
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
                                    completion: element.completion + '%',
                                    sectionWeight: element.section_weight + '%',
                                    overallWeight: element.overall_weight + '%',
                                    requirements: element.requirements,
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

export const HomeworkTool: React.FC = () => {
    const [homeworkData, setHomeworkData] = useState<HomeworkData[]>([]);

    const firebaseUser = app.auth().currentUser;
    let currentUserID = "";
    if(firebaseUser) currentUserID = firebaseUser.uid;

    useEffect(() => {
        const homeworkList = app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('HomeworkData')
            .onSnapshot(querySnapshot => {
                const homeworkList: HomeworkData[] = [];
                querySnapshot.forEach(document => {
                    const homeworkData = document.data();
                    if(homeworkData) {
                        const tempHomeworkData = {
                            class: homeworkData.class,
                            classID: document.id,
                            homeworks: [...homeworkData.homeworks]
                        }
                        tempHomeworkData.homeworks.sort((a, b) => a.DateCreated < b.DateCreated ? 1 : -1);
                        homeworkList.push(tempHomeworkData);
                    }
                });
                setHomeworkData(homeworkList);
            });
        return () => homeworkList();
    }, []);
    
    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [currentHomeworkEdit, setCurrentHomeworkEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Title', value: '', placeHolder: 'Homework #1',
         isInvalid: (value: string) => value === ''},
        {id: 'completion', label: 'Completion', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'section-weight', label: 'Section Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'reqs', label: 'Requirements', value: '', placeHolder: 'Do...',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: '', placeHolder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);
    
    // FUNCTIONS
    const handleFormAdd = async () => {
        const classID = homeworkData[tabValue].classID;
        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('HomeworkData')
            .doc(classID)
            .update({
                homeworks: firebase.firestore.FieldValue
                    .arrayUnion(formatInfo(inputs.map(input => input.value))),
            });
    }

    const handleFormEdit = async (homeworkName: string) => {
        const newInputs = [...inputs];
        const classIndex = tabValue;
        const homeworkIndex = homeworkData[classIndex].homeworks.findIndex(input => input.title === homeworkName);

        // TODO set an error saying it no longer exists
        if(homeworkIndex === -1) {
            setIsInvalidData(true);
            setOpenEdit(false);
        }

        setCurrentHomeworkEdit(homeworkName);
        const oldHomework = homeworkData[classIndex].homeworks[homeworkIndex];
        let i = 0;
        newInputs[i++].value = oldHomework.title;
        newInputs[i++].value = oldHomework.completion.toString();
        newInputs[i++].value = oldHomework.section_weight.toString();
        newInputs[i++].value = oldHomework.overall_weight.toString();
        newInputs[i++].value = oldHomework.requirements;
        newInputs[i++].value = oldHomework.resources.join(', ');
        setInputs(newInputs);
        setOpenEdit(true);
    }

    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }

    const handleFormOpen = () => {
        setOpenAdd(true);
    }

    const handleFormEditSubmit = async () => {
        const homeworkIndex = homeworkData[tabValue].homeworks.findIndex(input => input.title === currentHomeworkEdit);

        if(homeworkIndex === -1) {
            setIsInvalidData(true);
            setOpenEdit(false);
        }

        const classID = homeworkData[tabValue].classID;
        const oldHomeworktDateCreation = homeworkData[tabValue].homeworks[homeworkIndex].DateCreated;
        const oldHomeworkName = homeworkData[tabValue].homeworks[homeworkIndex].title;

        await handleDeleteButton(oldHomeworkName);

        const homeworkInfo = inputs.map(input => input.value);
        let i = 0;
        const newHomework: Homework = {
            title: homeworkInfo[i++],
            completion: parseInt(homeworkInfo[i++]),
            section_weight: parseInt(homeworkInfo[i++]),
            overall_weight: parseInt(homeworkInfo[i++]),
            requirements: homeworkInfo[i++],
            resources: homeworkInfo[i].length === 0 ? [] : homeworkInfo[i].split(','),
            DateCreated: oldHomeworktDateCreation,
        }

        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('HomeworkData')
            .doc(classID)
            .update( {
                homeworks: firebase.firestore.FieldValue.arrayUnion(newHomework),
            });
        setCurrentHomeworkEdit('');
    }

    const handleDeleteButton = async (homeworkName: string) => {
        const classID = homeworkData[tabValue].classID;
        const homeworkIndex = homeworkData[tabValue].homeworks.findIndex(homework => homework.title === homeworkName);

        if(homeworkIndex=== -1) {
            setIsInvalidData(true);
        }

        const deletable = homeworkData[tabValue].homeworks[homeworkIndex];

        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('HomeworkData')
            .doc(classID)
            .update( {
                homeworks: firebase.firestore.FieldValue.arrayRemove(deletable),
            });
    }
    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
    }

    //DATA
    const classes = useStyles();
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs')) ;

    return (
        <>
            <Box textAlign='center' m={isSmallDevice ? 0 : 6}>
                <CustomScrollableTabs
                    className={classes.tabs}
                    tabValue={tabValue}
                    onChange={handleNavChange}
                    tabNames={homeworkData.map(element => element.class)}
                />
                {isSmallDevice ?
                    <AppBar position="fixed" style={{top: 'auto', bottom: 0}}>
                        <BottomNavigation value={0} onChange={(event, newValue) => {}} className={classes.addHomework}>
                            <BottomNavigationAction
                                icon={<AddCircleIcon className={classes.addHomeworkIcon}/> }
                                onClick={handleFormOpen}
                            />
                        </BottomNavigation>
                    </AppBar> :
                    <Box m={6}>
                        <Button
                            variant='contained'
                            startIcon={<AddCircleIcon />}
                            className={classes.addHomework}
                            onClick={handleFormOpen}
                        >
                            Add
                        </Button>
                    </Box>
                }
                <Box m={6} p={isSmallDevice? 2 : 0}>
                    {homeworkData.map((element, index) => {
                        return <TabPanels
                                    value={tabValue}
                                    index={index}
                                    homeworkInfo={element}
                                    key={element.class}
                                    delete={handleDeleteButton}
                                    edit={handleFormEdit}
                                />
                    })}
                </Box>
                <AddForm
                    title='Add Homework'
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                    handleFormAdd={handleFormAdd}
                    inputs={inputs}
                    setInputs={setInputs}
                />
                <EditForm
                    title='Edit Homework'
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
                        {"Seems like the item homework doesn't exist anymore D:"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleInvalidDataClose} color='primary'>OK</Button>
                    </DialogActions>
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
        addHomework: {
            backgroundColor: SECONDARY_COLOR,
            color: DEFAULT_TEXT_COLOR,
        },
        addHomeworkIcon: {
            color: DEFAULT_TEXT_COLOR,
            fontSize: 25,
        }
    })
);