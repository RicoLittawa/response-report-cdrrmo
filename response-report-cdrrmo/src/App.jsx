import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Table from "./TableReport";

function App() {
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
  );
}

export default App;
