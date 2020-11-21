import React from 'react';
import { createStyles, Tabs, Tab, Box, makeStyles, Theme } from '@material-ui/core';

interface TabProps {
    className: string,
    tabValue: number,
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void,
    tabNames: string[],
}
export const CustomScrollableTabs = (tabProps: TabProps) => {
    const classes = useStyles();
    const { className, tabValue, onChange, tabNames} = tabProps;

    return (
        <>
            <Tabs
                className={className}
                value={tabValue}
                onChange={onChange}
                classes={{ indicator: classes.indicator}}
                scrollButtons='on'
                variant='scrollable'
            >
                {tabNames.map((tab,index) => {
                    return <Tab
                                label={<span className={classes.tab}>{tab}</span>}
                                key={tab+index}
                                classes={{selected: classes['&$tabSelected']}}
                            />
                })}
            </Tabs>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tab: {
            fontSize: '14px'
        },
        '&$tabSelected': {
            fontWeight: 'bolder',
            fontStyle: 'italic',
        },
        indicator: {
            backgroundColor: 'transparent',
        },
    })
)