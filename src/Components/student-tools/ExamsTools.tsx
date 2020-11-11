import React, { useState } from 'react';
import { Button, createStyles, Grid, makeStyles, Theme, Tabs, Tab, Card, Box} from "@material-ui/core";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';

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

interface ExamData {
    title: string
    section_weight: string
    overall_weight: string
    related_hw: string
    related_projs: string
    resources: string
    related_exams: string

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

const getExamCards = () => {
    return(
        <Grid item xs={12}>
            {examData.map(ele => {
                return <Card>ele</Card>
            })}
        </Grid>
    );
}

export const ExamsTools: React.FC = () => {
    const classes = useStyles();
    const[tabValue, setTabValue] = React.useState(0);
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return(
        <div className={classes.root}>
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
            <p>CardList Here</p>
            <Box textAlign='center'>
                <Button 
                    className={classes.button}
                    variant="contained"
                    onClick={() => {console.log('Button Clicked');}}
                >
                        Add Exams
                </Button>
            </Box>
        </div>
    );
}
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        tabs: {
            background: PRIMARY_COLOR,
            color: 'black',
            borderRadius: 10,
        },
        tab: {
            fontSize: '15px'
        },
        button: {
            backgroundColor: SECONDARY_COLOR,
        },
        indicator: {
            backgroundColor: 'transparent',
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        }
    })
);