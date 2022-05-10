import Header from "./components/Header";
import Footer from "./components/Footer";
import { NotLoggedRoute, UserRoute } from "./components/Routes";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import UserRegister from "./pages/UserRegister";
import Cart from "./pages/Cart";
import User from "./pages/User";
import AuthProvider from "./auth/AuthContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <NotLoggedRoute>
                <Login />
              </NotLoggedRoute>
            }
          />

          <Route
            path="/user/register"
            exact
            element={
              <NotLoggedRoute>
                <UserRegister />
              </NotLoggedRoute>
            }
          />

          <Route
            path="/menu"
            exact
            element={
              <UserRoute>
                <Menu />
              </UserRoute>
            }
          />

          <Route
            path="/cart"
            exact
            element={
              <UserRoute>
                <Cart />
              </UserRoute>
            }
          />

          <Route
            path="/user"
            exact
            element={
              <UserRoute>
                <User />
              </UserRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
