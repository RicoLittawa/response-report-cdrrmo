import Header from "../Header";
import UpdateForm from "./UpdateForm";
export default function Update() {
  return (
    <>
      <main className="flex justify-center">
        <section className="bg-white block shadow-md">
          <Header />
          <UpdateForm/>
        </section>
      </main>
    </>
  );
}
