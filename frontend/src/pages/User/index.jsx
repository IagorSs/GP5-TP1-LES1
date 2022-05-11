import { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";
import Order from "../../components/Order";
import * as UserService from "../../services/user";
import api from "../../config/api";
import "./style.css";

export default function User() {
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchAddress = async () => {
      const {
        data: { Address },
      } = await UserService.address();

      setAddress(Address);
    };

    const fetchHistory = async () => {
      const { data } = await api.get("/user/history");
      console.log(data);

      const order = data.map((order) => ({
        combos: order.Combo,
        drinks: order.Drinks,
        pizzas: order.Pizzas,
        status: order.Status,
      }));
    };

    setOrders(order);

    fetchHistory();
    fetchAddress();
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
        />
      </div>

      <compPizza> orders[0].pizza.flavor</compPizza>

      <div className="user-orders">
        <h2 className="user-orders-title">Histórico de Pedidos</h2>

      </div>
    </section>
  );
}
