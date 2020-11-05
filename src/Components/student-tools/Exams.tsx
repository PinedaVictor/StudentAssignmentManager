import React from "react";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { create } from "ts-style";

export const Exams: React.FC = () => {

    return (
        <div style = {styles.pageLayout}>
            
        </div>
    )
}

const styles = create({
    pageLayout: {
        display: 'grid',
        paddingTop: 50,
        justifyContent: "center",
        alignItems: 'center'
    },
})