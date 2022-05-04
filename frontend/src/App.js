import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cardapio from "./pages/Cardapio";
import CadastroUsuario from "./pages/CadastroUsuario";
import Carrinho from "./pages/Carrinho";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/cadastrar/usuario" exact element={<CadastroUsuario />} />
        <Route path="/cardapio" exact element={<Cardapio />} />
        <Route path="/carrinho" exact element={<Carrinho />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
