// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Etusivu from "./Etusivu";
import AddMatch from "./AddMatch";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Etusivu />} />
        <Route path="/lisaa-ottelu" element={<AddMatch />} />
      </Routes>
    </Router>
  );
}
