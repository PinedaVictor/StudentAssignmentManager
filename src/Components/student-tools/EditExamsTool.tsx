import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { CustomScrollableTabs } from '../ReusableParts/CustomScrollableTabs';
import { PRIMARY_COLOR } from '../../Styles/global';
import {RELATEDTABS} from './utils';

interface ExamDetails {
    className: string,
    examNumber: string,
}

const RelatedHomework = () => {
    const hws = ['1', '2', '3'];

    return(
        <>
                <Box>
                    <Paper style={{ margin: 'auto'}}>
                        <Typography variant='h4'>
                            Related Homework
                        </Typography>
                    </Paper>
                    <Button>
                        Hello
                    </Button>
                </Box>
 
        </>
    )
}

export const EditExamTool: React.FC<ExamDetails> = (examDetails: ExamDetails) => {
    // HOOKS
    const [tabValue, setTabValue] = useState(0);
    const {className, examNumber} = examDetails;

    // FUNCTIONS
    const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    // DATA
    const classes = useStyles();
    const isSmallDevice = useMediaQuery(useTheme().breakpoints.down);

    return (
        <>
            <Box textAlign='center' m={isSmallDevice ? 0 : 4}>
                <Typography variant='h3'>
                </Typography>
                <CustomScrollableTabs
                    className={classes.tabs}
                    tabValue={tabValue}
                    onChange={handleNavChange}
                    tabNames={RELATEDTABS}
                />
            </Box>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles( {
        tabs: {
            background: PRIMARY_COLOR,
            color: 'white',
            borderRadius: 10,
        },
    }),
);