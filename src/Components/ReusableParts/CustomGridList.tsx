import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DynamicCard } from './DynamicCard';
import { create } from 'ts-style';

type Props = {
    headers: any[];
    bodyTitles: any[];
    bodyContents: any[][];
    width: string;
    type: "standard" | "divided" | "tiny";
}


export const CustomGridList: React.FC<Props> = 
    ({headers, bodyTitles, bodyContents, width, type}) => {
    return (
        <div style={styles.coursesBody}>
            {headers.map((item, i) => (
                <DynamicCard
                    header={item}
                    bodyTitles={bodyTitles}
                    bodyContents={bodyContents[i]}
                    width={width}
                    type={type}
                />
            ))}
        </div>
    )
};

const styles = create({
    coursesBody: {
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "left",
        alignItems: "left",
        minWidth: 400,
        maxWidth: 1080,
        height: "auto",
        overflowX: "scroll" as "scroll",
    }
});