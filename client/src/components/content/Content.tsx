import { Outlet } from "react-router-dom";

/**
 * The content component wraps the main content of one page, so it must have an
 * <Outlet /> component inside.
 */
const Content = () => {
  return (
    <Outlet />
  );
};

export default Content;
