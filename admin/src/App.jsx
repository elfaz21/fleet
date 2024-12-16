import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Cars from "./pages/car_lists.jsx";

import Dashboard from "./pages/dashboard.jsx";
import NewCar from "./pages/newCar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/new-car" element={<NewCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
