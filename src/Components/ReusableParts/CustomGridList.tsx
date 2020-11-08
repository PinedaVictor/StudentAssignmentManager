import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DynamicCard } from './DynamicCard';

const COLUMNS_IN_GRID = 4;

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: '#fff' 
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
    }));

type Props = {
    list: string[];
}

export const CustomGridList: React.FC<Props> = ({list}) => {
    const classes = styles();
    
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={COLUMNS_IN_GRID} spacing={10}>
                {list.map((card) =>(
                    <GridListTile key={card}>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
};