import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        Tabs, Tab,
        Dialog, DialogTitle, DialogContent, DialogContentText, useMediaQuery, useTheme, DialogActions, TextField, Grid} from "@material-ui/core";
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR,
         BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR,
         PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';
import { CustomCardStandard } from '../ReusableParts/CustomCardStandard';


/*********************************************************
 * TODO:
 *      1. Better styling for text selected !!!!! DONE ? !!!!!
 *      3. Improve fill out form for exams 
 *          a. Currently looks like any fill out form
 *              maybe needs an improvement and styling
 *      4. Figure out how to make vertical box 
 *        for gridlists on mobile so it doesn't extend
 *        over a small set box ?
 *      5. Add sliding for dialog box?
 *      6. Need validation to find out if exam exists already
***********************************************************/

// BELOW IS JUST A PLACE HOLDER FOR DATA
const ExamDataJson: ExamData[] = [
    {
        class: 'Phil 101',
        exams: [
            {
                title: 'Exam #1',
                section_weight: '10',
                overall_weight: '10',
                related_hw: 'HW #1',
                related_projs: '',
                related_exams: '',
                resources: 'youtube.com',
            },
            {
                title: 'Exam #2',
                section_weight: '10',
                overall_weight: '10',
                related_hw: 'HW #1, HW #2',
                related_projs: 'Project #1',
                related_exams: 'Exam #1',
                resources: 'youtube.com',
            }
        ]
    },
    {
        class: 'Comp 101',
        exams: [
            {
                title: 'Exam #1',
                section_weight: '10',
                overall_weight: '10',
                related_hw: 'HW #1',
                related_projs: '',
                related_exams: '',
                resources: 'youtube.com',
            },
            {
                title: 'Exam #2',
                section_weight: '10',
                overall_weight: '10',
                related_hw: 'HW #1, HW #2',
                related_projs: 'Project #1',
                related_exams: 'Exam #1',
                resources: 'youtube.com',
            },
            {
                title: 'Exam #3',
                section_weight: '10',
                overall_weight: '10',
                related_hw: 'HW #1, HW #2, HW #3',
                related_projs: 'Project #1, Project #2',
                related_exams: '',
                resources: 'youtube.com',
            },
        ]
    },
    {
        class: 'Nap 101',
        exams: []
    }
]
// END OF PLACEHOLDER DATA

// INTERFACES
// Needed for every individual exam
interface Exam {
    title: string;
    section_weight: string; 
    overall_weight: string; 
    related_hw: string/* [] */;     
    related_projs: string/* [] */;
    related_exams: string/* [] */; 
    resources: string/* [] */;      
}
// Needed for every class and its exams
interface ExamData {
    class: string;
    exams: Exam[];
}
// Needed for tab creation
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    examInfo: ExamData;
    delete: (examName: string) => void;
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

// TODO need to add other sections
const formatInfo = (info: string[]): Exam => {
    let i = 0;
    let exam: Exam = {
        title: info[i++], 
        section_weight: info[i++],
        overall_weight: info[i++],
        related_hw: info[i++],
        related_projs: info[i++],
        related_exams: info[i++],
        resources: info[i],
    }
    return exam;
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
                            alignContent='space-between'
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
                                editClick={() => {console.log('Edit Card')}}
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
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [isInvalidData, setIsInvalidData] = useState(false);
    const [examData, setExamData] = useState<ExamData[]>(fetchExamData());
    // The hook below is used to keep track of sections we need
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam Title', value: '', placeholder: 'Exam #1',
         isInvalid: (value: string) => value === '' },
        {id: 'section-weight', label: 'Section Weight', value: '', placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'overall-weight', label: 'Overall Weight', value: '', placeholder: '10',
         isInvalid: (value: string) => value === '' || !/^\d{1,2}$/.test(value)},
        {id: 'related-hw', label: 'Related Homework', value: '', placeholder: 'HW #1',
         isInvalid: value => false},
        {id: 'related-pros', label: 'Related Projects', value: '', placeholder: 'Project #1',
         isInvalid: value => false},
        {id: 'related-exams', label: 'Related Exams', value: '', placeholder: 'Exam #1',
         isInvalid: value => false},
        {id: 'resources', label: 'Resources', value: '', placeholder: 'www.youtube.com',
         isInvalid: value => false}
    ]);

    // FUNCTIONS
    const clearInputs = () => {
        const newInputs = [...inputs];
        newInputs.forEach(input => input.value = '');
        setInputs(newInputs);
    };
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleInvalidDataClose = () =>{
        setIsInvalidData(false);
    }
    const handleFormOpen = () => {
        setOpenAdd(true);
    };
    // TODO add firebase backend on add
    const handleFormAdd = () => {
        const validForm = inputs.every(input => !input.isInvalid(input.value));
        if(!validForm){
            setIsInvalidData(true);
            return;
        }
        
        const newExamData = [...examData];
        const classIndex = tabValue;
        // TODO need make sure data entered is proper before submitting
        // Just title and weights that's all
        const examInfo = inputs.map(input => input.value);
        const newExam = formatInfo(examInfo);
        newExamData[classIndex].exams = [ ...examData[classIndex].exams, newExam];
        clearInputs();
        setExamData(newExamData);
        setOpenAdd(false);
    };
    const handleFormCancel = () => {
        clearInputs();
        setOpenAdd(false);
    };
    const onTextChange = ({target: {id, value}}: any) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    };
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

    const examFields = (
        <div className={classes.textFields} >
            {inputs.map(input => {
                const invalid = input.isInvalid(input.value);
                return <TextField fullWidth key={input.id} id={input.id} label={input.label} value={input.value}
                    type="text" onChange={onTextChange} error={invalid} placeholder={input.placeholder}/>
            })}
        </div>
    );


    return(
        <div className={classes.root}>
            <Box textAlign='center' m={isSmallDevice ? 0 : 4} > 
                <Tabs
                    className={classes.tabs}
                    value={tabValue}
                    onChange={handleNavChange}
                    aria-label="exams nav"
                    classes={{indicator: classes.indicator}}
                    scrollButtons='auto'
                    variant="scrollable"
                >
                    {examData.map((element, index) => {
                        return <Tab label={<span className={classes.tab}>{element.class}</span>} key={element.class} classes={{ selected: classes["&$tabSelected"]}}/>
                    })}
                </Tabs>
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
                        return <TabPanels value={tabValue} index={index} examInfo={element} key={element.class} delete={handleDeleteButton}/>
                    })}
                </Box>

                <Dialog
                    open={openAdd}
                    onClose={handleFormCancel}
                    fullScreen={isSmallDevice}
                >
                    <DialogTitle id="form-dialog-title">Adding Exam</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add an exam fill in the boxes below.
                        </DialogContentText>
                        {examFields}
                        <DialogActions>
                            <Button onClick={handleFormCancel} className={classes.cancelButton}> Cancel</Button>
                            <Button onClick={handleFormAdd} className={classes.addButton}>Add</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={isInvalidData}
                    onClose={handleInvalidDataClose}
                >
                    <DialogTitle className={classes.invalid} id="invalid-data">{"One or more data entries are invalid"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleInvalidDataClose} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        tabs: {
            background: PRIMARY_COLOR,
            color: 'white',
            borderRadius: 10,
        },
        tab: {
            fontSize: '16px'
        },
        '&$tabSelected':{
            fontWeight: 'bolder',
            fontStyle: 'italic'
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
        indicator: {
            backgroundColor: 'transparent',
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