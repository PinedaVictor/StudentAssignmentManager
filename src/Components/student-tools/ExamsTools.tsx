import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        useMediaQuery, useTheme, Grid} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { DEFAULT_TEXT_COLOR,
         SECONDARY_COLOR} from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { AddForm } from '../ReusableParts/AddForm';
import { EditForm } from '../ReusableParts/EditForm';
import { app } from "../../Database/initFirebase";
import { Exam, ExamData } from '../../Database/utils';
import firebase from 'firebase';

const formatInfo = (info: string[]): Exam => {
    let i = 0;
    let exam: Exam = {
        title: info[i++],
        section_weight: parseInt(info[i++]),
        overall_weight: parseInt(info[i++]),
        related_hw: info[i].length === 0? [] : info[i++].split(','),
        related_projs: info[i].length === 0? [] : info[i++].split(','),
        related_exams: info[i].length === 0? [] : info[i++].split(','),
        resources: info[i].length === 0? [] : info[i].split(','),
        DateCreated: Date(),
    }
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
                                    sectionWeight: element.section_weight + '%',
                                    overallWeight: element.overall_weight + '%',
                                    relatedHomework: element.related_hw,
                                    relatedProjects: element.related_projs,
                                    relatedExams: element.related_exams,
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

export const ExamsTools: React.FC = () => {
    const [examData, setExamData] = useState<ExamData[]>([]);

    const firebaseUser = app.auth().currentUser;
    let currentUserID = "";
    if(firebaseUser) currentUserID = firebaseUser.uid

    useEffect(() => {
        const examList = app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ExamData')
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
                        tempExamData.exams.sort((a, b) => a.DateCreated < b.DateCreated? 1 : -1);
                        examList.push(tempExamData);
                    }
                });
                setExamData(examList);
            });
        return () => examList();
    }, []);

    // HOOKS
    const [currentExamEdit, setCurrentExamEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam Title', value: '', placeHolder: 'Project #1',
         isInvalid: (value: string) => value === ''},
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
        const classID = examData[tabValue].ClassID;
        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ExamData')
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

        // TODO set an error saying it no longer exists?
        if(examIndex === -1) return;

        setCurrentExamEdit(examName);
        const oldExam = examData[classIndex].exams[examIndex];
        let i = 0;
        newInputs[i++].value = oldExam.title;
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

        if(examIndex === -1) return;

        const classID = examData[tabValue].ClassID;
        const oldExamDateCreation = examData[tabValue].exams[examIndex].DateCreated;
        const oldExamName = examData[tabValue].exams[examIndex].title;

        await handleDeleteButton(oldExamName);

        const examInfo = inputs.map(input => input.value);
        let i = 0;
        const newExam: Exam = {
            title: examInfo[i++],
            section_weight: parseInt(examInfo[i++]),
            overall_weight: parseInt(examInfo[i++]),
            related_hw: examInfo[i].length === 0 ? [] : examInfo[i++].split(','),
            related_projs: examInfo[i].length === 0 ? [] : examInfo[i++].split(','),
            related_exams: examInfo[i].length === 0 ? [] : examInfo[i++].split(','),
            resources: examInfo[i].length === 0 ? [] : examInfo[i++].split(','),
            DateCreated: oldExamDateCreation,
        }
        console.log(newExam);
        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ExamData')
            .doc(classID)
            .update({
                exams: firebase.firestore.FieldValue.arrayUnion(newExam)
            })
        setCurrentExamEdit('');
    }
    const handleDeleteButton = async (examName: string) => {
        const classID = examData[tabValue].ClassID;
        const examIndex = examData[tabValue].exams.findIndex(exam => exam.title === examName);

        if(examIndex === -1) return;
        
        const deletable = examData[tabValue].exams[examIndex];

        await app
            .firestore()
            .collection('users')
            .doc(currentUserID)
            .collection('ExamData')
            .doc(classID)
            .update({
                exams: firebase.firestore.FieldValue.arrayRemove(deletable),
            })
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
                <Box m={6}>
                    <Button
                        className={classes.addExam}
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        onClick={handleFormOpen}
                    >
                        Add Exams
                    </Button>
                </Box>
                <Box p={4} m={isSmallDevice ? 2 : 4}>
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
        }
    })
);