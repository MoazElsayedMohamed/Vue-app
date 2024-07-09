import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { path, text, icon } = link;
        return (
          <NavLink
            key={text}
            className="nav-link"
            to={path}
            onClick={isBigSidebar ? null : toggleSidebar}
          >
            <span>{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
