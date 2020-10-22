import React, { useState } from "react";
import { create } from "ts-style";
import { Card , Button } from "react-bootstrap";
import {DynamicCard}  from "../ReusableParts/DynamicCard";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PRIMARY_COLOR , SECONDARY_COLOR , BORDER_COLOR } from "../../Styles/global";
import { Box } from "@material-ui/core";

const classData = [
    {
        id: 1,
        Name: "Phil 101",
        Total: 70,
        Homework: 30,
        Exams: 65,
        Projects: 100
    },
    {
        id: 2,
        Name: "Phil 101",
        Total: 70,
        Homework: 30,
        Exams: 65,
        Projects: 100
    },
    {
        id: 3,
        Name: "Phil 101",
        Total: 70,
        Homework: 30,
        Exams: 65,
        Projects: 100
    },
    {
        id: 4,
        Name: "Phil 101",
        Total: 70,
        Homework: 30,
        Exams: 65,
        Projects: 100
    },
    {
        id: 5,
        Name: "Phil 101",
        Total: 70,
        Homework: 30,
        Exams: 65,
        Projects: 100
    }
]

const assignmentsData = [
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    {
        id: 1,
        class: "Phil 101",
        name: "homework 1",
        dueBy: "12/05",
        duration: "2 hours",
        priority: 3,
        sectionWeight: "20%",
        overallWeight: "5%"
    },
    
]

const tableColumns = [ "Class", "Assignment" , "Due By" , "Duration" , "Priority" , "Section Weight" , "Overall Weight" ]

export const Home: React.FC = () => {

    function LinearProgressWithLabel(value: number){
        return (
            <Box position= 'relative' display= 'inline-flex'>

                <CircularProgress style={{height: 40, borderRadius: 10}} variant="determinate" value={value} color="secondary"/>      
                <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <text style = {{fontSize: 12}}>
                        {`${Math.round(value,)}%`}
                    </text>
                    
                </Box>
              
            </Box>
          );
    }

    const tableHeaderCellFormat = () => {

        return{
            height: "auto",
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: "bold" as "bold",
            fontSize: 18,
            border: "1px solid",
            borderColor: "rgba(0, 0, 0, .25)"
        }
    }

    const tableBodyCellFormat = (index: number) => {
        
        return {
            backgroundColor: ((index + 2) % 2 !== 1) ? "#C0E1FF" : "#DEEFFF",
            height: "auto",
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 14,
            border: "1px solid",
            borderColor: "rgba(0, 0, 0, .25)"
        }
    }

    const renderTableHeader = () => (
        <TableHead>
            <TableRow style = {{backgroundColor: "#67B6FF"}}>
                {tableColumns.map((col) => (
                    <TableCell style = {tableHeaderCellFormat()}>{col}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )

    const renderTableBody = () => (
        <TableBody style = {styles.tableBody}>
            {assignmentsData.map((assignment, index) => (
                <TableRow>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.class}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.name}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.dueBy}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.duration}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.priority}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.sectionWeight}</TableCell>
                    <TableCell style = {tableBodyCellFormat(index)}>{assignment.overallWeight}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )

    const gradeOptionsClick = () => {

    }

    const assignmentsOptionsClick = () => {

    }

    return(
        <div style = {styles.pageLayout}>
            <Card style = {styles.cardParent}>
                <div style = {styles.cardHeader}>
                    <Button 
                    style = {styles.buttonStyle}
                    onClick = {gradeOptionsClick}>
                        Settings
                    </Button>
                    <text style={styles.headerTitle}>
                        Grades
                    </text>
                        
                </div>

                <Card.Body style = {styles.cardBody}>
                    {classData.map((item) => (
                        <DynamicCard
                        header={item.Name}
                        bodyTitles={["Total", "Homework", "Exams", "Projects"]}
                        bodyContents={[LinearProgressWithLabel(item.Total), LinearProgressWithLabel(item.Homework), LinearProgressWithLabel(item.Exams), LinearProgressWithLabel(item.Projects)]}
                        width={"200px"}
                        type="tiny"
                        /> 
                    ))}
                </Card.Body>
            </Card>

            <Card style = {styles.cardParent}>
                <div style = {styles.cardHeader}>
                    <Button 
                    style = {styles.buttonStyle}
                    onClick = {assignmentsOptionsClick}>
                        Settings
                    </Button>
                    <text style={styles.headerTitle}>
                        Assignments
                    </text>
                    
                </div>

                <Card.Body style = {styles.cardBody}>
                    <Paper style = {{
                        maxHeight: 300,
                        width: "100%",
                    }}>
                        <Table stickyHeader>
                            {renderTableHeader()}
                            {renderTableBody()}
                        </Table>
                    </Paper>
                    
                </Card.Body>
            </Card>
        </div>
    )
}

const styles = create({
    pageLayout: {
        display: 'grid',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardParent: {
        display: 'grid',
        gridTemplateRows: "40px auto",
        minWidth: 400,
        maxWidth: 1200,
        height: "auto",
        border: 'solid',
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        marginBottom: 50
    },

    cardHeader: {
        display: 'grid',
        gridTemplateColumns: "auto 1fr",
        justifyContent: 'left',
        alignItems: 'center',
        height: 35,
        backgroundColor: PRIMARY_COLOR,
        fontWeight: "bold" as "bold",
        fontSize: 24,
        color: 'black'
    },

    headerTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardBody: {
        display: 'flex',
        flexDirection: "row" as "row",
        overflowX: "scroll" as "scroll"
    },

    tableBody: {
        maxHeight: 20,
    },

    buttonStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: 'black',
        fontWeight: "bold" as "bold",
        fontSize: 16,
        height: 25,
        marginBottom: 0,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 0,
        padding: 2
    }
})