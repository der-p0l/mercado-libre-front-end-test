import { useEffect, useState } from "react";
import useNavbarSearch from "../../../hooks/useNavbarSearch";
import type { SearchItem } from "../../../types/items";
import { getItemList } from "../../../services/apiService";

/**
 * Hook used in the search page. It loads the search results based on user input.
 */
const useSearch = () => {
  const searchQuery = useNavbarSearch();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(false);
      setItems([]);
      setCategories([]);
      return;
    }

    setLoading(true);

    getItemList(searchQuery)
    .then((data) => {
      const {
        items,
        categories,
      } = data;

      setCategories(categories);
      setItems(items.map((item) => {
        // Transform snake case to camel case
        // TODO: improve this
        const {
          free_shipping,
          condition, // Unused
          ...otherProps
        } = item;

        return {
          ...otherProps,
          freeShipping: free_shipping,
        };
      }));
    })
    .catch((error) => {
      // TODO: handle error
      setItems([]);
      setCategories([]);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [searchQuery]);

  return {
    loading,
    items,
    categories,
  };
};

export default useSearch;
