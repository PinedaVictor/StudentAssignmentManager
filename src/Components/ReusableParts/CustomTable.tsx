import React from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { create } from "ts-style";
import { BORDER_COLOR, SECONDARY_COLOR } from "../../Styles/global";

interface Props {
  headerText: Array<string>;
  data: Array<DataType>;
}

interface DataType {
  id: number;
  [key: string]: any;
}

export const CustomTable: React.FC<Props> = ({ headerText, data }) => {
  const renderTableHeader = () => (
    <TableHead>
      <TableRow>
        {headerText.map((col, i) => (
          <TableCell style={styles.tableHeader}>{col}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderCellContents = (row: DataType) => {
    return Object.values(row).map(
      (cell, index) => index !== 0 && <StyledTableCell>{cell}</StyledTableCell>
    );
  };

  const renderTableBody = () => (
    <TableBody>
      {data.map((row: DataType, index) => (
        <StyledTableRow key={row.id}>{renderCellContents(row)}</StyledTableRow>
      ))}
    </TableBody>
  );

  return (
    <Table stickyHeader>
      {renderTableHeader()}
      {renderTableBody()}
    </Table>
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

const styles = create({
  tableHeader: {
    height: "100%",
    fontWeight: "bold" as "bold",
    fontSize: 20,
    color: "white",
    border: "1px solid",
    borderColor: BORDER_COLOR,
    backgroundColor: SECONDARY_COLOR,
  },
});
