import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cardapio from "./pages/Cardapio";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/cardapio" exact element={<Cardapio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
