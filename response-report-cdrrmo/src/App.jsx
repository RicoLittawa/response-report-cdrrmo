import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./Add/FormPage";
import UpdatePage from "./Update/UpdatePage";
import TablePage from "./Table/TablePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TablePage />}></Route>
          <Route path="/form" element={<FormPage />}></Route>
          <Route path="/update/:id" element={<UpdatePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
