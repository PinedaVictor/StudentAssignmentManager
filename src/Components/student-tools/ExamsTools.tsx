import React from 'react';
import { createStyles, makeStyles, Theme, Button, Box,
        Tabs, Tab,
        Card, CardContent,
        GridList, GridListTile,
        Dialog, DialogTitle, DialogContent, DialogContentText, useMediaQuery, useTheme, DialogActions, TextField, Typography} from "@material-ui/core";
import { BUTTON_DELETE_BACKGROUND_COLOR, BUTTON_DELETE_HOVER_BACKGROUND_COLOR, BUTTON_EDIT_BACKGROUND_COLOR, BUTTON_EDIT_HOVER_BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';

/********************************** 
 * TODO:
 *      - Better styling for text selected
 *      - Add exams to current tabs
 *      - Improve fill out form for exams
 *      - Figure out how to make vertical box 
 *        for gridlists on mobile so it doesn't extend
 *        over a small set box
************************************/


const ExamDataJson: ExamData[] = [
    {
        class: 'Phil 101',
        exams: [
            'Exam #1',
            'Exam #2'
        ]
    },
    {
        class: 'Comp 101',
        exams: [
            'Exam #1',
            'Exam #2',
            'Exam #3'
        ]
    },
    {
        class: 'Nap 101',
        exams: []
    }
]

// Information types
interface ExamData {
    class: string
    exams: string[]
/*     section_weight: string
    overall_weight: string
    related_hw: string
    related_projs: string
    resources: string
    related_exams: string */
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    examInfo: ExamData;
}

// TODO
const fetchExamData = () => {
    return ExamDataJson;
}

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
);

function TabPanels(props: TabPanelProps){
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
                        <GridListTile key={element}>
                            <Card>
                                <CardContent>
                                    <Typography style={{ fontSize: 14 }}>
                                        {element}
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
    // Information needed
    const classes = useStyles();
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
    let data:ExamData[] = fetchExamData();
    
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
                    {data.map((element, index) => {
                        return <Tab label={<span className={classes.tab}>{element.class}</span>} key={element.class} onClick={() => {console.log(element);}}/>
                    })}
                </Tabs>
                <Box p={4} m={isSmallDevice ? 2 : 4}>
                    {data.map((element, index) => {
                        return <TabPanels value={tabValue} index={index} examInfo={element} key={element.class}/>
                    })}
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
                    fullScreen={isSmallDevice}
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