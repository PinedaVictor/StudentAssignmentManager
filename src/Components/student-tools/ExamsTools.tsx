import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        useMediaQuery, useTheme, Grid} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { DEFAULT_TEXT_COLOR,
         SECONDARY_COLOR} from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { Exam, ExamData} from '../../Database/utils';
import { ExamDataJson } from '../../Database/PlaceHolderData';
import { AddForm } from '../ReusableParts/AddForm';
import { EditForm } from '../ReusableParts/EditForm';

// TODO - add backend data fetch
const fetchExamData = () => {
    return ExamDataJson;
}

const formatInfo = (info: string[]): Exam => {
    let i = 0;
    let exam: Exam = {
        title: info[i++],
        section_weight: info[i++],
        overall_weight: info[i++],
        related_hw: info[i].length === 0? [] : info[i++].split(','),
        related_projs: info[i].length === 0? [] : info[i++].split(','),
        related_exams: info[i].length === 0? [] : info[i++].split(','),
        resources: info[i].length === 0? [] : info[i].split(','),
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


// TODO - store data on creation
const storeExamData = (data: ExamData) => {
}

// TODO - delete a value from the db
const deleteExamData = () => {

}

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
    // HOOKS
    const [currentExamEdit, setCurrentExamEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [examData, setExamData] = useState<ExamData[]>(fetchExamData());
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
    const handleFormAdd = () => {
        const newExamData = [...examData];
        // TODO DB calls
        const examInfo = inputs.map(input => input.value);
        if(examData[tabValue].exams) {
            newExamData[tabValue].exams = [...newExamData[tabValue].exams, formatInfo(examInfo)];
            setExamData(newExamData);
        }
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

        const oldExam = examData[classIndex].exams[examIndex];
        let i = 0;
        newInputs[i++].value = oldExam.title;
        newInputs[i++].value = oldExam.section_weight;
        newInputs[i++].value = oldExam.overall_weight;
        newInputs[i++].value = oldExam.related_hw.join(', ');
        newInputs[i++].value = oldExam.related_projs.join(', ');
        newInputs[i++].value = oldExam.related_exams.join(', ');
        newInputs[i].value = oldExam.resources.join(', ');
        setInputs(newInputs);
        setOpenEdit(true);
    };
    const handleFormEditSubmit = () => {
        const newExamData = [...examData];
        const examInfo = inputs.map(input => input.value);
        const classIndex = tabValue;
        const examIndex = examData[classIndex].exams.findIndex(input => input.title === currentExamEdit);

        if(examIndex === -1) return;

        let i = 0;
        newExamData[classIndex].exams[examIndex].title = examInfo[i++];
        newExamData[classIndex].exams[examIndex].section_weight = examInfo[i++];
        newExamData[classIndex].exams[examIndex].overall_weight = examInfo[i++];
        newExamData[classIndex].exams[examIndex].related_hw = examInfo[i].length === 0 ? [] : examInfo[i++].split(',');
        newExamData[classIndex].exams[examIndex].related_projs = examInfo[i].length === 0 ? [] : examInfo[i++].split(',');
        newExamData[classIndex].exams[examIndex].related_exams = examInfo[i].length === 0 ? [] : examInfo[i++].split(',');
        newExamData[classIndex].exams[examIndex].resources = examInfo[i].length === 0 ? [] : examInfo[i++].split(',');

        // DB call right here to update
        setCurrentExamEdit('');
        setExamData(newExamData);
    }
    const handleDeleteButton = (examName: string) => {
        const newExamData = [...examData];
        const classIndex = tabValue;
        // TODO make sure deletion updates the DB
        const examIndex = examData[classIndex].exams.findIndex(exam => exam.title === examName);
        newExamData[classIndex].exams.splice(examIndex, 1);
        setExamData(newExamData);
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