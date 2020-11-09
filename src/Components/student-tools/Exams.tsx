import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { create } from 'ts-style';
import { CustomNavBar } from '../ReusableParts/CustomNavBar';
import { CustomButton } from '../ReusableParts/CustomButton';
import { CustomGridList } from '../ReusableParts/CustomGridList';
import { DynamicCard } from '../ReusableParts/DynamicCard';

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
    }
]

export const Exams: React.FC = () => {
    const [cardModal, setCardModal] = useState(false);
    return (
        <div style={styles.pageStyle}>
{/*            <CustomNavBar list={list} /> */}
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
            <div style={styles.examBody}>
                {exams.map((item, i) => (
                    <DynamicCard
                        header={item.title}
                        bodyContents={{
                            sectionWeight: item.sectionWeight,
                            relatedHomework: item.relatedHomework,
                            relatedProjects: item.relatedProjects,
                            resources: item.resources,
                            relatedExams: item.relatedExams
                        }}
                        width={'auto'}
                        type='standard'
                        editClick={() =>{}}
                        deleteClick={() => {}}
                    />
                ))}
            </div>
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
    examBody: {
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "left",
        alignItems: "left",
        minWidth: 400,
        maxWidth: 1080,
        height: "auto",
        overflowX: "scroll" as "scroll",
    }
})