import React, { useState } from 'react';
import { Button, createStyles, Grid, makeStyles, Paper, Theme, Tabs, Tab, Card, GridList, GridListTile } from "@material-ui/core";
import { create } from 'ts-style';
import { CustomNavBar } from '../ReusableParts/CustomNavBar';
import { CustomButton } from '../ReusableParts/CustomButton';
import AppBar from '@material-ui/core/AppBar';
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

const allyProps = (index: any) => {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    }
}
const getExamCards = () => {
    return(
        <Grid item xs={12}>
            {examData.map(ele => {
                return <Card>ele</Card>
            })}
        </Grid>
    );
}
export const Exams: React.FC = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);
    const [currentClass, setCurrentClass] = React.useState("");

    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.root}>
           <Grid container spacing={5} justify="space-between" alignItems="center" direction="column">
               <Grid item xs={12}>
                    <AppBar position="static" className={classes.appBar}>
                        <Tabs
                            value={tabValue}
                            onChange={handleNavChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="exams nav"
                            classes={{indicator: classes.indicator}}
                            centered
                        >
                            {list.map((element, index) => {
                                return <Tab label={element} {...allyProps(index)}/>
                            })}
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center"}}>
                    <Button variant="contained">Add Exam</Button>
                </Grid>
                <Grid item xs={12}>
                    <GridList className={classes.gridList} cols={4}>
                        {examData.map((ele) => (
                            <GridListTile key={ele}>
                                <Card >{ele}</Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
           </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            paddingTop: '5%',
            alignItems: "center",
            justifyContent: "center"
        },
        appBar: {
            background: PRIMARY_COLOR,
            color: 'black',
            borderRadius: 10,
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