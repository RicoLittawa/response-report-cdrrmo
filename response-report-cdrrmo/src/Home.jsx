import FormFields from "./Add/Form";
import Table from "./Add/TableReport";
import { useState } from "react";
import Header from "./Components/Header";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <main className="flex justify-center">
        <section className="bg-white block shadow-md">
          <Header />
          <FormFields/>
          <Table />
        </section>
      </main>
    </>
  );
}
