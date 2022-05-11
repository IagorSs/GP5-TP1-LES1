import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Order from "../../components/Order";
import * as UserService from "../../services/user";
import "./style.css";

export default function User() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const { data: { Address } } = await UserService.address();

      setAddress(Address);
    }

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
          sx={{ width: '50%', minWidth: '400px' }}
        />
      </div>

      <div className="user-orders">
        <h2 className="user-orders-title">Histórico de Pedidos</h2>
        <Order />
      </div>
    </section>
  );
}
