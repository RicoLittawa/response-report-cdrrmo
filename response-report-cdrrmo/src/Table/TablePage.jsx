import TableProvider from "../Components/TableProvider";
import TableContent from "./TableContent";
export const TablePage = () => {
  return (
    <>
      <TableProvider>
        <TableContent />
      </TableProvider>
    </>
  );
};

export default TablePage;
