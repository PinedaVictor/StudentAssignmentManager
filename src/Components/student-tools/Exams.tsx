import React, { useState } from 'react';
import { Button, createStyles, Grid, GridList, GridListTile, makeStyles, Paper, Theme, Tabs, Tab } from "@material-ui/core";
import { create } from 'ts-style';
import { CustomNavBar } from '../ReusableParts/CustomNavBar';
import { CustomButton } from '../ReusableParts/CustomButton';
import AppBar from '@material-ui/core/AppBar';
import { CustomGridList } from '../ReusableParts/CustomGridList';
import { DynamicCard } from '../ReusableParts/DynamicCard';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../Styles/global';

const list = [
    'Phil 101',
    'Comp 301',
    'Nap 101',
    
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

export const Exams: React.FC = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);
    const [currentClass, setCurrentClass] = React.useState("");

    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container>
           </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: { 
            padding: theme.spacing(2),
        },
        appBar: {
            background: PRIMARY_COLOR,
            color: 'black',
            borderRadius: 10,
        },
        button: {
            backgroundColor: SECONDARY_COLOR,
            fontSize: '20'
        },
        gridListRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper
        } ,
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
        indicator: {
            backgroundColor: 'transparent',
        }
    })
);