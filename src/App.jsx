import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from "./Component/Api";
import Edit from "./Component/Edit";
import Api2 from "./Component/Api2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <Api2/>
    </BrowserRouter>
  );
}

export default App;
