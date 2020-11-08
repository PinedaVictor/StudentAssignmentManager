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

const gridList = [
    'stuff',
    'lots',
    'of',
    'stuff',
]

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
            <CustomGridList list={gridList}/>
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