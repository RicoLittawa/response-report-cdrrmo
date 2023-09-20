import Form from "./Form";
import Table from "./TableReport";
import Header from "./Header";

export default function Home(){
    return (
        <>
        <main className="flex justify-center">
        <section className="bg-white block shadow-md">
          <Header />
          <Form />
          <Table />
        </section>
      </main>
        </>
    )
}