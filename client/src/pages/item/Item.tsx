import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Loading from "../../components/loading/Loading";
import Price from "../../components/price/Price";
import useItem from "./hooks/useItem";
import "./Item.scss";

/**
 * The item page component. Shows detail of one item.
 */
const Item = () => {
  const {
    loading,
    item,
    categories,
  } = useItem();

  const getDescription = (description: string) => {
    if (!description) {
      return (
        <p>Sin descripción.</p>
      );
    }

    const descriptionLines = description.split("\n");

    return (
      <p>{descriptionLines.map((line, idx) => {
        const isLastLine = (descriptionLines.length === idx + 1);

        return (
          <span key={idx}>
            {line}
            {!isLastLine && (
              <br />
            )}
          </span>
        );
      })}</p>
    );
  };

  return (
    <div id="item" className="container">
      {loading && (
        <Loading />
      )}
      {!loading && (
        <>
          {item && (
            <>
              {categories.length > 0 && (
                <div id="breadcrumb">
                  <Breadcrumb categories={categories} />
                </div>
              )}
              <div id="content">
                {/* Main left content */}
                <div id="left">
                  <div id="picture">
                    <img src={item.picture} alt={`Imagen de ${item.title}`} />
                  </div>
                  <div id="description">
                    <h4>Descripción del producto</h4>
                    {getDescription(item.description)}
                  </div>
                </div>
                {/* Right sidebar */}
                <div id="right">
                  <div id="title">
                    <div id="detail">
                      <span>{item.condition} - {item.soldQuantity.toLocaleString("es-AR")} vendidos</span>
                    </div>
                    <div id="main">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                  <div id="price">
                    <h3>
                      <Price {...item.price} />
                    </h3>
                  </div>
                  <div id="buttons">
                    <button type="button" className="main-button">Comprar</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {!item && (
            // In case we couldn't load the item
            <p id="no-results">No se encontró el ítem que buscaba.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Item;
