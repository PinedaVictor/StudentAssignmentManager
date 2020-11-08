import React from 'react';
import { makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Box, Typography, Tab, Tabs } from '@material-ui/core';

import { PRIMARY_COLOR } from '../../Styles/global';

type NavBarProps = {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const NavBarTabPanel = (props: NavBarProps) => {
    const {children, value, index, ...other} = props;

    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const allyProps = (index: any) => {
    return {
        id: `scrollabe-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

// Place styles in this for the NavBar
// It will be moved once the navbar is finalized
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

type Props = {
    list: string[];
}

export const CustomNavBar:React.FC<Props> = ({list}) => {
    const classes = useStyles();
    const[value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    centered
                >
                    {list.map((element, index) => {
                        return (<Tab label={element} {...allyProps(index)}/>);
                    })}
                </Tabs>
            </AppBar>
        </div>
    )
};
