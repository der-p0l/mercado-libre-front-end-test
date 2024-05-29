import { useSearchParams } from "react-router-dom";

/**
 * Hook to get the navbar's search query, otherwise it returns null.
 */
const useNavbarSearch = () => {
  const [search] = useSearchParams();

  return search.get("search");
};

export default useNavbarSearch;
