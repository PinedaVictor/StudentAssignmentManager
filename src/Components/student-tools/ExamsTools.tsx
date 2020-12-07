import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        useMediaQuery, useTheme, Grid, AppBar, BottomNavigation, BottomNavigationAction, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { DEFAULT_TEXT_COLOR,
         SECONDARY_COLOR} from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { EditForm } from '../ReusableParts/EditForm';
import { app } from "../../Database/initFirebase";
import { DatabaseDocNames, Exam, ExamData } from '../../Database/utils';
import firebase from 'firebase';

const formatInfo = (info: string[]): Exam => {
    let i = 0;
    let exam: Exam = {
        title: '',
        DateDue: '',
        grade: 0,
        section_weight: 0,
        overall_weight: 0,
        related_hw: [],
        related_projs: [],
        related_exams: [],
        resources: []
    }

    exam.title = info[i++];
    exam.DateDue = info[i++];
    exam.grade = isNaN(parseInt(info[i])) ? -1 : parseInt(info[i]);
    i++;
    exam.section_weight = parseInt(info[i++]);
    exam.overall_weight = parseInt(info[i++]);
    exam.related_hw = info[i].length === 0? [] : info[i].split(',');
    i++;
    exam.related_projs = info[i].length === 0? [] : info[i].split(',');
    i++;
    exam.related_exams = info[i].length === 0? [] : info[i].split(',');
    i++;
    exam.resources = info[i].length === 0? [] : info[i].split(',');
    i++;

    return exam;
}

// INTERFACES
// Needed for tab creation
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    examInfo: ExamData;
    delete: (examName: string) => void;
    edit: (examName: string) => void;
}
// END INTERFACES

const TabPanels = (props: TabPanelProps) => {
    const {children, value, index, examInfo, ...func} = props;

    return(
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
                    {examInfo.exams.map((element, index) => (
                        <Grid
                            item
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
                                    grade: element.grade === -1 ? 'No grade yet' : element.grade + '%' ,
                                    sectionWeight: element.section_weight + '%',
                                    overallWeight: element.overall_weight + '%',
                                }}
                                expandingData={{
                                    resources: element.resources,
                                    relatedHomework: element.related_hw,
                                    relatedProjects: element.related_projs,
                                    relatedExams: element.related_exams,
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

export const ExamsTools: React.FC = () => {
    const [examData, setExamData] = useState<ExamData[]>([]);

    useEffect(() => {
        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid

        const examList = app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.examData)
            .onSnapshot(querySnapshot => {
                const examList: ExamData[] = [];
                querySnapshot.forEach(document => {
                    const examData = document.data();
                    if(examData) {
                        const tempExamData = {
                            class: examData.class,
                            ClassID: document.id,
                            exams: [...examData.exams]
                        }
                        tempExamData.exams.sort((a, b) => a.DateDue < b.DateDue? -1 : 1);
                        examList.push(tempExamData);
                    }
                });
                setExamData(examList);
            });
        return () => examList();
    }, []);

    // HOOKS
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [currentExamEdit, setCurrentExamEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam Title', value: '', placeHolder: 'Exam #1',
         isInvalid: (value: string) => value === ''},
        {id: 'duedate', label: 'Due Date', value: '', placeHolder: '4/20/71',
         isInvalid: (value: string) => isNaN(Date.parse(value))},
        {id: 'grade', label: 'Grade', value: '', placeHolder: '90',
         isInvalid: (value: string) => !/^\d{0,3}$/.test(value)},
        {id: 'section-weight', label: 'Section Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: '', placeHolder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'related-hw', label: 'Related Homework', value: '', placeHolder: 'HW #1, HW #2',
         isInvalid: () => false},
        {id: 'related-projs', label: 'Related Projects', value: '', placeHolder: 'Project #1, Project #2',
         isInvalid: () => false},
        {id: 'related-exams', label: 'Related Exams', value: '', placeHolder: 'Exam #1, Exam #2',
         isInvalid: () => false},
        {id: 'resources', label: 'Resources', value: '', placeHolder: 'www.youtube.com, linkedin.com/learning',
         isInvalid: () => false}
    ]);

    // FUNCTIONS
    const handleFormAdd = async () => {
        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid

        const classID = examData[tabValue].ClassID;
        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.examData)
            .doc(classID)
            .update({
                exams: firebase.firestore.FieldValue
                    .arrayUnion(formatInfo(inputs.map(input => input.value))),
            });
    }
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleFormOpen = () => {
        setOpenAdd(true);
    };
    const handleFormEdit = (examName: string) => {
        const newInputs = [...inputs];
        const classIndex = tabValue;
        const examIndex = examData[classIndex].exams.findIndex(input => input.title === examName);

        if(examIndex === -1) {
            setIsInvalidData(true);
            setOpenEdit(false);
            return;
        }

        setCurrentExamEdit(examName);
        const oldExam = examData[classIndex].exams[examIndex];
        let i = 0;
        newInputs[i++].value = oldExam.title;
        newInputs[i++].value = oldExam.DateDue;
        newInputs[i++].value = oldExam.grade === -1 ? '' : oldExam.grade.toString();
        newInputs[i++].value = oldExam.section_weight.toString();
        newInputs[i++].value = oldExam.overall_weight.toString();
        newInputs[i++].value = oldExam.related_hw.join(', ');
        newInputs[i++].value = oldExam.related_projs.join(', ');
        newInputs[i++].value = oldExam.related_exams.join(', ');
        newInputs[i].value = oldExam.resources.join(', ');

        setInputs(newInputs);
        setOpenEdit(true);
    };
    const handleFormEditSubmit = async () => {
        const examIndex = examData[tabValue].exams.findIndex(input => input.title === currentExamEdit);

        if(examIndex === -1){
            setIsInvalidData(true);
            setOpenEdit(false);
            return;
        }

        const classID = examData[tabValue].ClassID;
        const oldExamName = examData[tabValue].exams[examIndex].title;

        await handleDeleteButton(oldExamName);

        const examInfo = inputs.map(input => input.value);

        const newExam = formatInfo(examInfo);

        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid

        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.examData)
            .doc(classID)
            .update({
                exams: firebase.firestore.FieldValue.arrayUnion(newExam)
            })
        setCurrentExamEdit('');
    }

    const handleDeleteButton = async (examName: string) => {
        const classID = examData[tabValue].ClassID;
        const examIndex = examData[tabValue].exams.findIndex(exam => exam.title === examName);

        if(examIndex === -1){
            setIsInvalidData(true);
            return;
        }
        
        const deletable = examData[tabValue].exams[examIndex];

        const firebaseUser = app.auth().currentUser;
        let currentUserID = "";
        if(firebaseUser) currentUserID = firebaseUser.uid

        await app
            .firestore()
            .collection(DatabaseDocNames.users)
            .doc(currentUserID)
            .collection(DatabaseDocNames.examData)
            .doc(classID)
            .update({
                exams: firebase.firestore.FieldValue.arrayRemove(deletable),
            })
    }

    const handleInvalidDataClose = () => {
        setIsInvalidData(false);
    }

    // Information needed
    const classes = useStyles();
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));

    return(
        <>
            <Box textAlign='center' m={isSmallDevice ? 0 : 6} > 
                <CustomScrollableTabs
                    className={classes.tabs}
                    tabValue={tabValue}
                    onChange={handleNavChange}
                    tabNames={examData.map(element => element.class)}
                />
                { isSmallDevice ? 
                    <AppBar position="fixed" style={{top: 'auto', bottom: 0}}>
                        <BottomNavigation value={0} onChange={(event, newValue) => {}} className={classes.addExam}>
                            <BottomNavigationAction
                                icon={<AddCircleIcon className={classes.addExamIcon}/> }
                                onClick={handleFormOpen}
                                disabled={examData.length === 0}
                            />
                        </BottomNavigation>
                    </AppBar> :
                    <Box m={6}>
                        <Button
                            className={classes.addExam}
                            variant="contained"
                            startIcon={<AddCircleIcon />}
                            onClick={handleFormOpen}
                            disabled={examData.length === 0}
                        >
                            Add Exam
                        </Button>
                    </Box>
                }
                <Box p={6} m={isSmallDevice ? 2 : 4}>
                    {examData.map((element, index) => {
                        return <TabPanels 
                                    value={tabValue}
                                    index={index}
                                    examInfo={element}
                                    key={element.class}
                                    delete={handleDeleteButton}
                                    edit={handleFormEdit}/>
                    })}
                </Box>
                <AddForm
                    title='Add Exam'
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                    handleFormAdd={handleFormAdd}
                    inputs={inputs}
                    setInputs={setInputs}
                />
                <EditForm
                    title='Edit Exam'
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
            </Box>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        tabs: {
            background: SECONDARY_COLOR,
            color: DEFAULT_TEXT_COLOR,
            borderRadius: 10,
        },
        addExam: {
            backgroundColor: SECONDARY_COLOR,
            color: DEFAULT_TEXT_COLOR,
        },
        addExamIcon: {
            color: DEFAULT_TEXT_COLOR,
            fontSize: 25,
        }
    })
);