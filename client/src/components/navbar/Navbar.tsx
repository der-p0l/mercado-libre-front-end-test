import "./Navbar.scss";
import logo from "../../images/logo.png";
import searchImg from "../../images/search.png";
import { Link, useLocation } from "react-router-dom";
import useNavbarSearch from "../../hooks/useNavbarSearch";

/**
 * The navigation bar component, showing at the top of every page.
 */
const Navbar = () => {
  const searchQuery = useNavbarSearch();
  const locationPath = useLocation().pathname;

  return (
    <div id="navbar">
      <div className="container">
        {/* Logo */}
        <div id="navbar-logo">
          <Link to="/" reloadDocument>
            <img src={logo} alt="Mercado Libre Logo"/>
          </Link>
        </div>
        {/* Search */}
        <div id="navbar-search">
          <form action="/items" method="get">
            <input
              id="navbar-input"
              type="text"
              name="search"
              placeholder="Nunca dejes de buscar"
              autoFocus={["/items", "/"].includes(locationPath)}
              defaultValue={locationPath === "/items" ? (searchQuery || "") : ""}
            />
            <button id="navbar-button" type="submit" aria-label="Buscar">
              <img src={searchImg} alt="" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
