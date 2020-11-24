import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        useMediaQuery, useTheme, Grid} from "@material-ui/core";
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR,
         BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR,
         PRIMARY_COLOR } from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { Exam, ExamData} from '../../Database/utils';
import { AddExam } from '../NonReusableComponents/AddExamForm';
import { EditExam } from '../NonReusableComponents/EditExamForm';
import { ExamDataJson } from '../../Database/PlaceHolderData';
/*********************************************************
 * TODO:
 *      3. Improve fill out form for exams 
 *          a. Currently looks like any fill out form
 *              maybe needs an improvement and styling
 *      6. Need validation to find out if exam exists already
***********************************************************/

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

// TODO - add backend data fetch
const fetchExamData = () => {
    return ExamDataJson;
}

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
    const [currentEdit, setCurrentEdit] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [examData, setExamData] = useState<ExamData[]>(fetchExamData());
    // FUNCTIONS
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleFormOpen = () => {
        setOpenAdd(true);
    };

    const handleDeleteButton = (examName: string) => {
        const newExamData = [...examData];
        const classIndex = tabValue;
        // TODO make sure deletion updates the DB
        const examIndex = examData[classIndex].exams.findIndex(exam => exam.title === examName);
        newExamData[classIndex].exams.splice(examIndex, 1);
        setExamData(newExamData);
    }
    const handleEditButton = (examName: string) => {
        setCurrentEdit(examName);
        setOpenEdit(true);
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
                        className={classes.examButton}
                        variant="contained"
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
                                    edit={handleEditButton}/>
                    })}
                </Box>
                <AddExam
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                    examData={examData}
                    setExamData={setExamData}
                    classIndex={tabValue}/>
                <EditExam
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    examData={examData}
                    setExamData={setExamData}
                    classIndex={tabValue}
                    examName={currentEdit}
                />

            </Box>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        tabs: {
            background: PRIMARY_COLOR,
            color: 'white',
            borderRadius: 10,
        },
        textFields:
        {
            justify:'space-between',
            alignItems: 'center',
        },
        examButton: {
            backgroundColor: '#1c588c',
            color: 'white'
        },
        addButton: {
            backgroundColor: BUTTON_EDIT_BACKGROUND_COLOR,
            '&:hover': {
                backgroundColor: BUTTON_EDIT_HOVER_BACKGROUND_COLOR,
            }
        },
        cancelButton: {
            backgroundColor: BUTTON_DELETE_BACKGROUND_COLOR,
            '&:hover': {
                backgroundColor: BUTTON_DELETE_HOVER_BACKGROUND_COLOR,
            }
        },
        invalid: {
            color: 'red',
        }
    })
);