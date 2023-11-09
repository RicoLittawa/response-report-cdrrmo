import React from "react";
import TableProvider from "./TableProvider";
import { TablePagination } from "@mui/material";

const Table = () => {
  return (
    <>
      <TableProvider>
        <div>
          <h1>Reports</h1>
        </div>
        <TablePagination />
      </TableProvider>
    </>
  );
};

export default Table;
