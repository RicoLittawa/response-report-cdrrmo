import UpdateForm from "./UpdateForm";
import Header from "../Components/Header";
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
