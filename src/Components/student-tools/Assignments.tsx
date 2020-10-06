import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
// TODO: Types must be defined for library
// import cellEditFactory from "react-bootstrap-table2-editor";

export const Assignments: React.FC = () => {
  const assigments: any = [];

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
  ];

  function addProducts(quantity: number) {
    const startId = assigments.length;
    for (let i = 0; i < quantity; i++) {
      const id = startId + i;
      assigments.push({
        id: id,
        name: "Item name " + id,
        price: 2100 + i,
      });
    }
  }

  addProducts(3);

  return (
    <>
      <div
        style={{
          backgroundColor: "",
          display: "block",
          margin: "auto",
          marginTop: "5em",
        }}
      >
        <BootstrapTable
          tabIndexCell
          keyField="id"
          data={assigments}
          columns={columns}
          selectRow={{ mode: "checkbox" }}
          //   TODO: Implement cell editing
          //   cellEdit={cellEditFactory({ mode: "click" })}
          cellEdit={() => {}}
        />
      </div>
    </>
  );
};
