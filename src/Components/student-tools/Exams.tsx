import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { create } from 'ts-style';
import { CustomNavBar } from '../ReusableParts/CustomNavBar';
import { CustomButton } from '../ReusableParts/CustomButton';
import { CustomGridList } from '../ReusableParts/CustomGridList';

const list = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6',
    'item7',
    'item8'
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

const titles = [
    "section weight",
    "overall weight",
    "related homework", 
    "related projects",
    "resources",
    "related exams"
]

const tempData = [
    [
        "50%",
        "20%",
        "hw#1",
        "Project 1",
        "www.google.com",
        "none"
    ],
    [
        "50%",
        "20%",
        "hw#2",
        "Project 2",
        "www.google.com",
        "none"
    ]
];

export const Exams: React.FC = () => {
    const [cardModal, setCardModal] = useState(false);
    return (
        <div style={styles.pageStyle}>
           <CustomNavBar list={list} />
           <div style={styles.buttonStyle}>
                <CustomButton
                    title='Add Exam'
                    onClick={() => setCardModal(true)}
                    theme='default'
                    dimensions={{
                        width: 'auto',
                        height: 'auto'
                    }}
                />
            </div>
            <CustomGridList 
                headers={["exam 1", "exam 2"]}
                bodyTitles={titles}
                bodyContents={tempData}
                width={"auto"}
                type={"divided"}
            />
        </div>
    )
}

const styles = create({
    pageStyle: {
        display: 'grid',
        paddingTop: 50, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
        paddingBottom: 25 
    },

})