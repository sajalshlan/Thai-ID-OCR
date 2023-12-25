import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRecord from "./components/EditRecord";
import Records from "./components/Records";
import Home from "./components/Home";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/records" element={<Records />} />
          <Route path="/record/:recordId" element={<EditRecord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

