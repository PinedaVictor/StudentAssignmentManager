import React from 'react';
import { makeStyles, useTheme, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { create } from 'ts-style';
import { SECONDARY_COLOR } from '../../Styles/global';
import { AnyAaaaRecord } from 'dns';

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: "#C0E1FF"
      },
      '&:nth-of-type(odd)': {
        backgroundColor: "#DEEFFF"
      },
    },
  }),
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
        height: "auto",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, .25)"
    },
  }),
)(TableCell);

interface Props {
    headerText: Array<string>,
    data: Array<DataType>
}

interface DataType {
    [key: string]: any
}


export const CustomTable: React.FC<Props> = ({headerText, data}) => {
    
    const renderTableHeader = () => (
        <TableHead>
            <TableRow>
                {headerText.map((col, i) => (
                    <TableCell style = {styles.tableHeader}>{col}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )

    const renderCellContents = (row: DataType) => {
        
        return Object.values(row).map((cell, index) => (
            (index !== 0 &&
            <StyledTableCell>{cell}</StyledTableCell>
            )
        ))
            
        
    }

    const renderTableBody = () => (
        <TableBody>
            {data.map((row: DataType, index) => (
                <StyledTableRow>
                    {
                        renderCellContents(row)
                    }
                </StyledTableRow>
            ))}
        </TableBody>
    )

    return(

        <Table stickyHeader>
            {renderTableHeader()}
            {renderTableBody()}
        </Table>
    )

}

const styles = create({
    tableHeader: {
        height: "auto",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "bold" as "bold",
        fontSize: 18,
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, .25)",
        backgroundColor: SECONDARY_COLOR
    }
})