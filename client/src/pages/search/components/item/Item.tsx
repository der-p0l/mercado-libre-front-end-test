import { Link } from "react-router-dom";
import "./Item.scss";
import freeShippingImg from "../../../../images/free-shipping.png";
import type { SearchItem } from "../../../../types/items";
import Price from "../../../../components/price/Price";

type ItemProps = Omit<SearchItem, "freeShipping"> & { freeShipping?: boolean };

/**
 * The item component used in the list of the search page. Not to be confused
 * with the item page component.
 */
const Item = ({
  id,
  title,
  price,
  picture,
  freeShipping = false,
  region,
}: ItemProps) => {
  return (
    <div className="item">
      <Link to={`/items/${id}`} aria-label={`Click para abrir el artículo ${title}`}>
        {/* Picture */}
        <div className="picture">
          <img src={picture} alt={`Imagen de ${title}`} />
        </div>
        <div className="content">
          {/* Main left content */}
          <div className="left">
            <div className="price">
              <h3 className="number">
                <Price {...price} />
              </h3>
              {freeShipping && (
                <img className="shipping" src={freeShippingImg} title="¡Envío gratuito!" alt="¡Envío gratuito!" />
              )}
            </div>
            <h2 className="title">{title}</h2>
          </div>
          {/* Right content */}
          <div className="right">
            <span>{region}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
