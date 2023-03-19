import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Pages from "./pages";

function App() {
  return (
    <Routes>
      <Route exact path="/consumer/login" element={<Pages.Login />} />
      <Route exact path="/users" element={<Pages.Users />} />
    </Routes>
  );
}

export default App;
