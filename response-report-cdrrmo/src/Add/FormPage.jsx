import FormContent from "./FormContent";
import TableProvider from "../Components/TableProvider";
export default function FormPage() {
  return (
    <>
      <TableProvider>
        <FormContent />
      </TableProvider>
    </>
  );
}
