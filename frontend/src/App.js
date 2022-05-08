import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import UserRegister from "./pages/UserRegister";
import Cart from "./pages/Cart";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/user/register" exact element={<UserRegister />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/user" exact element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
