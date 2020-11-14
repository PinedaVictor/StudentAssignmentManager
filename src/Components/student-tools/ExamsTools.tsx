import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        Tabs, Tab,
        Card, CardContent,
        GridList, GridListTile,
        Dialog, DialogTitle, DialogContent, DialogContentText, useMediaQuery, useTheme, DialogActions, TextField, Typography} from "@material-ui/core";
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';

/*********************************************************
 * TODO:
 *      - Better styling for text selected
 *      - Add exams to current tabs !!!!! DONE !!!!!
 *      - Improve fill out form for exams
 *      - Figure out how to make vertical box 
 *        for gridlists on mobile so it doesn't extend
 *        over a small set box
 *      - Add sliding for dialog box?
***********************************************************/

// BELOW IS JUST A PLACE HOLDER FOR DATA
const ExamDataJson: ExamData[] = [
    {
        class: 'Phil 101',
        exams: [
            {
                title: 'Exam #1',
            },
            {
                title: 'Exam #2',
            }
        ]
    },
    {
        class: 'Comp 101',
        exams: [
            {
                title: 'Exam #1',
            },
            {
                title: 'Exam #2',
            },
            {
                title: 'Exam #3',
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
    section_weight?: string; 
    overall_weight?: string; 
    related_hw?: string[];     
    related_projs?: string[];  
    resources?: string[];      
    related_exams?: string[];
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
}
// END INTERFACES

// TODO - add backend data fetch
const fetchExamData = () => {
    return ExamDataJson;
}

const TabPanels = (props: TabPanelProps) => {
    const {children, value, index, examInfo, ...other} = props;

    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <GridList style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}} cols={3}>
                    {examInfo.exams.map((element) => (
                        <GridListTile key={element.title}>
                            <Card>
                                <CardContent>
                                    <Typography component={'span'} style={{ fontSize: 14 }}>
                                        {element.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
            )}
        </div>
    )
}
export const ExamsTools: React.FC = () => {
    // Hooks
    const [tabValue, setTabValue] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [examData, setExamData] = useState<ExamData[]>(fetchExamData());
    const [inputs, setInputs] = useState([
        {id: 'title', label: 'Exam', value: ''},
    ]);

    // Functions
    const clearInputs = () => {
        const newInputs = [...inputs];
        newInputs.forEach(input => input.value = '');
        setInputs(newInputs);
    };
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleFormOpen = () => {
        setOpenAdd(true);
    };
    // TODO add firebase backend on add
    const handleFormAdd = () => {
        const newExamData = [...examData];
        const classIndex = tabValue;
        // TODO need to refine this for multiple sections
        const newExam: Exam = {title: inputs[inputs.findIndex(input => input.id === 'title')].value}
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
    // Information needed
    const classes = useStyles();
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down('xs'));

    const examFields = (
        <div style={{textAlign: 'center', justifyContent: 'space-around'}} >
            {inputs.map(input => (
                <TextField key={input.id} id={input.id} label={input.label} value={input.value} type="text" onChange={onTextChange}/>
            ))}
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
                        return <Tab label={<span className={classes.tab}>{element.class}</span>} key={element.class} />
                    })}
                </Tabs>
                <Box p={4} m={isSmallDevice ? 2 : 4}>
                    {examData.map((element, index) => {
                        return <TabPanels value={tabValue} index={index} examInfo={element} key={element.class}/>
                    })}
                </Box>

                <Box m={6}>
                    <Button
                        className={classes.examButton}
                        variant="contained"
                        onClick={handleFormOpen}
                    >
                        Add Exams
                    </Button>
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
            color: 'black',
            borderRadius: 10,
        },
        tab: {
            fontSize: '15px'
        },
        examButton: {
            backgroundColor: SECONDARY_COLOR,
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
        }
    })
);