import "../../styles/normalize.css";
import "../../styles/global.scss";
import "./Layout.scss";
import Content from "../content/Content";
import Navbar from "../navbar/Navbar";

/**
 * The main layout of the site, used in every (major) page.
 */
const Layout = () => {
  return (
    <div id="layout">
      <Navbar />
      <Content />
    </div>
  );
};

export default Layout;
