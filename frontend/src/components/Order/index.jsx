import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Product from "../../components/Product";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { convertToMoney } from "../../utils/string";

import "./style.css";

function Order() {
  const [status, setStatus] = useState("");
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaList, setPizzaList] = useState([]);
  const [comboList, setComboList] = useState([]);

  const STATUS = {
    Aceito: "Aceito",
    EmPreparo: "Em Preparo",
    Finalizado: "Finalizado",
  };

  return (
    <section>
      <Box className="order-main">
        <div className="order-infos">
          <div className="order-id">
            <TextField
              label={"Identificador"}
              value={"Identificador"}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>

          <div className="order-data">
            <TextField
              label={"Data/Hora do pedido"}
              value={"10/10/2022 - 11:30:45"}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </div>

          <div className="order-status">
            <FormControl sx={{ m: 0, minWidth: 100 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(newValue) => setStatus(newValue.target.value)}
                autoWidth
                label="Status"
              >
                {Object.entries(STATUS).map(([value, description]) => (
                  <MenuItem key={value} value={value}>
                    {description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          <TextField
            id="order-user"
            label={"Nome"}
            value={"UserOrder.Nome"}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </div>

        <div>
          <h2 className="pizzas-title">Pizzas</h2>
          {pizzaList.map(
            (pizza) => (
              (pizza.Type = "Pizza"),
              (<Product key={pizza.id} product={pizza} />)
            )
          )}
        </div>

        <div>
          <h2 className="drinks-title">Drinks</h2>
          {drinksList.map(
            (drink) => (
              (drink.Type = "Drink"),
              (<Product key={drink.id} product={drink} />)
            )
          )}
        </div>

        <div>
          <h2 className="combos-title">Combos</h2>
          {comboList.map(
            (combo) => (
              (combo.Type = "Combo"),
              (<Product key={combo.id} product={combo} />)
            )
          )}
        </div>

        <div className="order-observacoes">
          <TextField
            id="order-observacoes"
            label={"Observações"}
            value={"observacoes"}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </div>

        <div className="value-read-only-input">
          <TextField
            label="Valor do pedido (R$)"
            value={convertToMoney(50)}
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
