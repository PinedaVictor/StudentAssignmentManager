import React, { useState } from "react";
import { create } from "ts-style";
import { Card , Button } from "react-bootstrap";
import DynamicCard  from "../ReusableParts/DynamicCard";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { PRIMARY_COLOR , SECONDARY_COLOR , BORDER_COLOR } from "../../Styles/global";

const classData = [
    {
        id: 1,
        Name: "Phil 101",
        Total: "45%",
        Homework: "85%",
        Exams: "70%",
        Projects: "100%"
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

    const filterClick = () => {

    }

    const sortClick = () => {

    }

    return(
        <div style = {styles.pageLayout}>
            <Card style = {styles.cardParent}>
                <Card.Header style = {styles.cardHeader}>Grades</Card.Header>

                <Card.Body style = {styles.cardBody}>
                    {classData.map((item) => (
                        <DynamicCard
                        header={item.Name}
                        hasDividers={false}
                        bodyTitles={["Total", "Homework", "Exams", "Projects"]}
                        bodyTexts={[item.Total, item.Homework, item.Exams, item.Projects]}
                        maxWidth={"200px"}
                        hasButtons={false}
                        /> 
                    ))}
                </Card.Body>
            </Card>

            <div style = {styles.tableOptionsSection}>
                
                <Button 
                style = {styles.buttonStyle}
                onClick = {filterClick}>
                    Filters
                </Button>

                <Button 
                style = {styles.buttonStyle}
                onClick = {sortClick}>
                    Sort By
                </Button>

            </div>

            <Card style = {styles.cardParent}>
                <Card.Header style = {styles.cardHeader}>Assignments</Card.Header>

                <Card.Body style = {styles.cardBody}>
                    <Paper style = {{
                        maxHeight: 400,
                        maxWidth: "100%",
                        overflowX: "scroll" as "scroll",
                        overflowY: "scroll" as "scroll"
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
        maxWidth: 800,
        height: "auto",
        border: 'solid',
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        marginBottom: 50
    },

    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        backgroundColor: PRIMARY_COLOR,
        fontWeight: "bold" as "bold",
        fontSize: 24,
        color: 'black'
    },

    cardBody: {
        display: 'flex',
        flexDirection: "row" as "row"
    },

    tableBody: {
        maxHeight: 20,
        overflowY: "scroll" as "scroll"
    },

    tableOptionsSection: {
        display: 'flex',
        flexDirection: "row" as "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },

    buttonStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontWeight: "bold" as "bold",
        fontSize: 18,
        marginBottom: 0,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 0,
        padding: 2
    }
})