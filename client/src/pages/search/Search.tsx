import Breadcrumb from "../../components/breacrumb/Breadcrumb";
import Loading from "../../components/loading/Loading";
import Item from "./components/item/Item";
import useSearch from "./hooks/useSearch";
import "./Search.scss";

/**
 * The search page component. This is where the user is redirected if they search
 * for something in the navbar form.
 */
const Search = () => {
  const {
    loading,
    categories,
    items,
  } = useSearch();

  return (
    <div id="search" className="container">
      {loading && (
        <Loading />
      )}
      {!loading && (
        <>
          {items.length > 0 && (
            <>
              {categories.length > 0 && (
                <div id="breadcrumb">
                  <Breadcrumb categories={categories} />
                </div>
              )}
              <div id="list">
                {/* List items / TODO: add pagination */}
                {items.map((item) => (  
                  <Item {...item} key={item.id} />
                ))}
              </div>
            </>
          )}
          {items.length <= 0 && (
            // If the search got no results
            <p id="no-results">No se obtuvieron resultados para su búsqueda.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
