import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ItemInfo } from "../../../types/items";
import { getItemDetail } from "../../../services/apiService";
import { mapCondition } from "../../../services/mappingService";

/**
 * Hook used in the item page. Loads the item data and categories.
 */
const useItem = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<ItemInfo|null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setItem(null);
      setCategories([]);
      return;
    }

    setLoading(true);

    getItemDetail(id)
    .then((data) => {
      const {
        item,
        categories,
      } = data;

      // Transform snake case to camel case
      // TODO: improve this
      const {
        condition,
        free_shipping,
        sold_quantity,
        ...otherProps
      } = item;

      const newItem = {
        ...otherProps,
        condition: mapCondition(condition),
        freeShipping: free_shipping,
        soldQuantity: sold_quantity,
      };

      setCategories(categories);
      setItem(newItem);
    })
    .catch((error) => {
      // TODO: handle error
      setItem(null);
      setCategories([]);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  return {
    loading,
    item,
    categories,
  };
};

export default useItem;
