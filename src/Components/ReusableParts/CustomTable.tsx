import React from "react";
import { Theme, createStyles, withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { create } from "ts-style";
import { BORDER_COLOR, SECONDARY_COLOR } from "../../Styles/global";
import { Paper, TableContainer } from "@material-ui/core";

interface Props {
  headerText: Array<string>;
  data: Array<DataType>;
}

interface DataType {
  [key: string]: any;
}

export const CustomTable: React.FC<Props> = ({ headerText, data }) => {
  const classes = useStyles()

  const renderTableHeader = () => (
    <TableHead>
      <TableRow>
        {headerText.map((col, i) => (
          <TableCell className={classes.tableHeader}>{col}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderCellContents = (row: DataType) => {
    return Object.values(row).map(
      (cell) => <StyledTableCell>{cell}</StyledTableCell>
    );
  };

  const renderTableBody = () => (
    <TableBody>
      {data.map((row: DataType, index) => (
        <StyledTableRow>{renderCellContents(row)}</StyledTableRow>
      ))}
    </TableBody>
  );

  return (
    <Paper className = {classes.root}>
      <TableContainer className = {classes.container}>
        <Table stickyHeader aria-label="sticky table">
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </TableContainer>
    </Paper>
    
  );
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(even)": {
        backgroundColor: SECONDARY_COLOR,
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#404040",
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      height: "100%",
      fontSize: 18,
      border: "1px solid",
      borderColor: BORDER_COLOR,
      color: "white"
    },
  })
)(TableCell);

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxHeight: "80vh",
    border: "1px solid",
    borderColor: BORDER_COLOR,
    backgroundColor: SECONDARY_COLOR,
    overflowY: "scroll"
  },

  container: {
    maxHeight: "80vh"
  },

  tableHeader: {
    fontWeight: "bold" as "bold",
    fontSize: 20,
    color: "white",
    border: "1px solid",
    borderColor: BORDER_COLOR,
    backgroundColor: SECONDARY_COLOR,
  },
});
