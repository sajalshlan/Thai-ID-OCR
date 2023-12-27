import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Records from "./components/Records";
import EditRecord from "./components/EditRecord";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/records" element={<Records />} />
        <Route path="/record/:recordId" element={<EditRecord />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

