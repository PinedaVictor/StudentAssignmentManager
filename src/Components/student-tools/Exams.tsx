import React, { useState } from 'react';
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { create } from "ts-style";
import CustomNavBar from '../ReusableParts/CustomNavBar';

const list = [
    'item1',
    'item2',
    'item3',
]


export const Exams: React.FC = () => {
    const selected = 'item1';

    return (
        <div className="Exams">
            <CustomNavBar list={list} selected={selected}/>
        </div>
    )
}

