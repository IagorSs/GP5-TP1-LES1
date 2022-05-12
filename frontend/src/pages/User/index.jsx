import { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";
import Order from "../../components/Order";
import * as UserService from "../../services/user";
import Product from "../../components/Product";
import "./style.css";
import { Pizza, Combo, Drink } from "../../models/products";

export default function User() {
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      const {
        data: { Address },
      } = await UserService.address();

      setAddress(Address);
    };

    const fetchHistory = async () => {
      const { data } = await UserService.getOrders();

      const orderProducts = data.map((order) => ({
        combos: order.Combos.map((combo) => new Combo(combo)),
        drinks: order.Drinks.map((drink) => new Drink(drink)),
        pizzas: order.Pizzas.map((pizza) => {
          const flavorsNamed = {};

          pizza.Flavor.forEach(
            ({ id }, index) => (flavorsNamed[`Flavor${index + 1}`] = id)
          );

          return new Pizza({
            ...pizza,
            ...flavorsNamed,
            qtdeFlavors: pizza.Flavor.length,
          });
        }),
        status: order.Status,
        id: order.id,
        createdAt: order.createdAt,
        total: order.Total,
        observation: order.Observation[0],
      }));

      setOrders(orderProducts);
    };

    fetchAddress();
    fetchHistory();
  }, []);

  return (
    <section className="user-main">
      <div className="user-address">
        <h2 className="user-address-title">Endereço Padrão</h2>
        <TextField
          label="Endereço"
          value={address}
          disabled
          required
          variant="outlined"
          sx={{ width: "50%", minWidth: "400px" }}
          z
        />
      </div>

      <div className="user-orders">
        <h2 className="user-orders-title">Histórico de Pedidos</h2>
        {orders.map((order) => {
          const orderElement = <Order order={order} />;

          const pizzasElements = order.pizzas.map((pizza) => (
            <Product product={pizza} isCart />
          ));
          const drinksElements = order.drinks.map((drink) => (
            <Product product={drink} isCart />
          ));
          const combosElements = order.combos.map((combos) => (
            <Product product={combos} isCart />
          ));

          return [
            orderElement,
            ...pizzasElements,
            ...drinksElements,
            ...combosElements,
          ];
        })}
      </div>
    </section>
  );
}
