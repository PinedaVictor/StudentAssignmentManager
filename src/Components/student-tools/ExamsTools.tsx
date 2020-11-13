import React from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        Tabs, Tab,
        Card, GridList, GridListTile,
        Dialog, DialogTitle, DialogContent, DialogContentText, useMediaQuery, useTheme, DialogActions, TextField} from "@material-ui/core";
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';

const list = [
    'Phil 101',
    'Comp 301',
    'Nap 101',
]

const examData = [
    'Exam #1',
    'Exam #2',
    'Exam #3',
    'Exam #4',
    'Exam #5',
    'Exam #6',
]

type ExamData = {
    title: string
    section_weight: string
    overall_weight: string
    related_hw: string
    related_projs: string
    resources: string
    related_exams: string

}

//TODO
const fetchClasses = () => {
    return list;
}
// TODO
const fetchExamData = () => {
    return examData;
}

const exams = [
    {
        title: 'Exam #1',
        sectionWeight: 10,
        relatedHomework: [
            'Homework 1',
            'Homework 2',
            'Homework 3'
        ],
        relatedProjects: [
            'Project 1'
        ],
        resources: [
            'www.google.com'
        ],
        relatedExams: [
            'Exam 1',
            'Quiz 1',
            'Quiz 2'
        ]
    },
]

const examFields = (
    <div style={{textAlign: 'center'}}>
        <TextField required autoFocus fullWidth variant="outlined" label="Exam" type="text" />
        <TextField required variant="outlined" label="Section Weight" type="text" />
        <TextField required variant="outlined" label="Overall Weight" type="text"/>
        <TextField required fullWidth variant="outlined" label="Related Homework" type="text"/>
        <TextField required fullWidth variant="outlined" label="Related Projects" type="text"/>
        <TextField required fullWidth variant="outlined" label="Resources" type="text" />
        <TextField required fullWidth variant="outlined" label="Resources" type="text" />
    </div>
)

export const ExamsTools: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    // Hooks
    const [tabValue, setTabValue] = React.useState(0);
    const [openAdd, setOpenAdd] = React.useState(false);

    // Functions
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };
    const handleOpen = () => {
        setOpenAdd(true);
    };
    const handleClose = () => {
        setOpenAdd(false);
    };


    return(
        <div className={classes.root}>
            <Box textAlign='center' m={4} > 
                <Tabs
                    className={classes.tabs}
                    value={tabValue}
                    onChange={handleNavChange}
                    aria-label="exams nav"
                    classes={{indicator: classes.indicator}}
                    scrollButtons='auto'
                    variant="scrollable"
                >
                    {list.map((element, index) => {
                        return <Tab label={<span className={classes.tab}>{element}</span>} key={element} onClick={() => {console.log(element);}}/>
                    })}
                </Tabs>
                <Box p={4} m={4}>
                    <GridList className={classes.gridList} cols={3}>
                        {examData.map((element, index) => (
                            <GridListTile key={element}>
                                <p>{element}</p>
                            </GridListTile>
                        ))}
                    </GridList>
                </Box>

                <Box m={6}>
                    <Button
                        className={classes.examButton}
                        variant="contained"
                        onClick={handleOpen}
                    >
                            Add Exams
                    </Button>
                </Box>
                <Dialog
                    open={openAdd}
                    onClose={handleClose}
                    fullScreen={fullScreen}
                >
                    <DialogTitle id="form-dialog-title">Adding Exam</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {examFields}
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleClose} className={classes.cancelButton}> Cancel</Button>
                            <Button onClick={handleClose} className={classes.addButton}>Add</Button>
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
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
        textFields:{
            
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