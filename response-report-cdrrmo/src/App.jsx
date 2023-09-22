import "./App.css";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Home from "./Home";
import Update from "./Update/Update"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
