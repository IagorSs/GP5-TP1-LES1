import React from "react";
import Produto from "../../components/Produto";
import "./style.css";

export default function Cardapio() {
  let quantProductCards = 10;
  let productInfo = [];

  async function handleGetPizzaDetail() {
    let data;

    for (var i = 0; i < quantProductCards; i++) {
      // data = await getMovieDetail(moviesListOfGenre.at(initial).id);
      data = {
        link: "https://claudia.abril.com.br/wp-content/uploads/2020/07/pizza-pepperoni.jpg",
        page: "Cardápio",
      };
      productInfo.push(data);
    }
  }

  handleGetPizzaDetail();

  return (
    <section className="main-cardapio">
      <h1 className="cardapio-title">Cardápio</h1>

      {productInfo.length > 0 && (
        <div className="list-products-cardapio">
          {productInfo.map((product) => (
            <Produto product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
