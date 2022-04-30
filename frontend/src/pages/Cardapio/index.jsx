import React from "react";
import CardPizza from "../../components/CardPizza";
import "./style.css";

export default function Cardapio() {
  let quantPizzaCards = 9;
  let pizzasInfo = [];

  async function handleGetPizzaDetail() {
    let data;

    for (var i = 0; i < quantPizzaCards; i++) {
      // data = await getMovieDetail(moviesListOfGenre.at(initial).id);
      data = {
        link: "https://claudia.abril.com.br/wp-content/uploads/2020/07/pizza-pepperoni.jpg",
      };
      pizzasInfo.push(data);
    }
  }

  handleGetPizzaDetail();

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      {pizzasInfo.length > 0 && (
        <div className="list-pizzas">
          {pizzasInfo.map((pizzaInfo) => (
            <CardPizza pizza={pizzaInfo} />
          ))}
        </div>
      )}
    </section>
  );
}
