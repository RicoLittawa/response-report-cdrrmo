import Form from "./Form";
import Table from "./TableReport";
import Header from "./Header";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <main className="flex justify-center">
        <section className="bg-white block shadow-md">
          <Header />
          <Form/>
          <Table />
        </section>
      </main>
    </>
  );
}
