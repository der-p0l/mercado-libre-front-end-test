import "./Price.scss";
import type { Price as PriceType } from "../../types/items";

type PriceProps = PriceType;

/**
 * Useful component to show the price of an item. You may need to wrap it in a
 * flex container.
 */
const Price = ({
  currency,
  amount,
  decimal,
}: PriceProps) => {
  return (
    <>
      <span>{currency}</span>
      <span className="amount">
        {amount.toLocaleString("es-AR")}
        {decimal > 0 && (
          <span className="decimal">{decimal.toString().padStart(2, "0")}</span>
        )}
      </span>
    </>
  );
};

export default Price;