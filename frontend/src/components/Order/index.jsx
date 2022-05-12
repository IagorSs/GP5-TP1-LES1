import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { convertToMoney } from "../../utils/string";

import "./style.css";

function Order({ order }) {
  const [id] = useState(order.id);
  const [status] = useState(order.status);
  const [date] = useState(order.createdAt);
  const [total] = useState(order.total);
  const [observation] = useState(order.observation);

  return (
    <section>
      <Box className="order-main">
        <div className="order-infos">
          <div className="order-id">
            <TextField
              label={"Identificador"}
              value={id}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>

          <div className="order-data">
            <TextField
              label={"Data/Hora do pedido"}
              value={date}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>

          <div className="order-status">
            <TextField
              id="order-status"
              label={"Status"}
              value={status}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>
        </div>

        <div className="order-payment">
          <TextField
            id="order-observacoes"
            label={"Observações"}
            value={observation}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />

          <TextField
            className="value-read-only-input"
            label="Valor do pedido (R$)"
            value={convertToMoney(total)}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
      </Box>
    </section>
  );
}

export default Order;
