import * as React from "react";
import Address from "../../components/Address";
import Order from "../../components/Order";
// import * as UserService from "../../services/user";
import "./style.css";

export default function User() {
  // async function handleInsertUser() {
  //   let userInfos = JSON.parse(localStorage.getItem("user"));
  //   let addressInfos = JSON.parse(localStorage.getItem("address"));

  //   // console.log(userInfos);
  //   // console.log(addressInfos);
  //   // let index = productsStorage.findIndex((item) => item.id === product.id);
  //   // productsStorage.splice(index, 1);
  //   // localStorage.setItem("cart", JSON.stringify(productsStorage));
  //   // window.location.reload();
  // }

  return (
    <section className="user-main">
      <div className="user-address">
        <h2 className="user-address-title">Endereço Padrão</h2>
        <Address />
      </div>

      <div className="user-orders">
        <h2 className="user-orders-title">Histórico de Pedidos</h2>
        <Order />
        {/* <Order /> */}
      </div>
    </section>
  );
}
