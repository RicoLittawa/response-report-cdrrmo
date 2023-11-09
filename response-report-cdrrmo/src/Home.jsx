import FormFields from "./Add/Form";
import Table from "./Add/TableReport";
import { useState } from "react";
import Header from "./Components/Header";
import TableProvider from "./Components/TableProvider";

export default function Home() {
  return (
    <>
      <TableProvider>
        <main className="flex justify-center">
          <section className="bg-white block shadow-md">
            <Header />
            <FormFields />
            <Table />
          </section>
        </main>
      </TableProvider>
    </>
  );
}
